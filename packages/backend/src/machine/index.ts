import { Container, Image, Machine, MachineDefinitionJson } from '../domain';
import MachinesJson from './machines.json';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { createContainer, pullImages } from '../cri';
import { Duplex } from 'stream';
import debounce from 'lodash/debounce';
import once from 'lodash/once';
import { toError } from 'fp-ts/Either';

let preparedImages: readonly Machine[] = [];
const ContainerMap = new Map<Image, Container>();
const IdleTeardownTime = 1000 * 60 * 5;

const getOrCreateContainer = TE.tryCatchK(async (machineSpec: Machine): Promise<Container> => {
  if (ContainerMap.has(machineSpec.image)) {
    return ContainerMap.get(machineSpec.image)!;
  } else {
    const container = await createContainer(machineSpec);
    ContainerMap.set(machineSpec.image, container);
    // Todo: extract the start function from here
    await container.start();
    return container;
  }
}, toError);

const connect = (machineSpec: { image: Image }, dupStream: Duplex, onTeardown: () => void) => {
  const spec = preparedImages.find((image) => image.image === machineSpec.image);
  const teardownOnIdle = once(
    async (container: Container, spec: Machine, onTeardown: () => void): Promise<void> => {
      await container.stop();
      await container.remove();
      ContainerMap.delete(spec.image);
      onTeardown();
      console.log('teardown');
    }
  );
  const debouncedTeardownOnIdle = debounce(teardownOnIdle, IdleTeardownTime);

  return pipe(
    TE.Do,
    TE.bind('spec', () =>
      pipe(
        O.fromNullable(spec),
        TE.fromOption(() => new Error('no such image was found'))
      )
    ),
    TE.bind('container', ({ spec }) => getOrCreateContainer(spec)),
    TE.chainFirst(({ container, spec }) =>
      TE.tryCatch(
        () =>
          container.exec(
            {
              Cmd: spec.repl,
              onData: () => {
                debouncedTeardownOnIdle(container, spec, onTeardown);
              },
              onStart: () => {
                debouncedTeardownOnIdle(container, spec, onTeardown);
              },
            },
            dupStream
          ),
        toError
      )
    )
  );
};

const validateJson = (json: Record<string, unknown>) => pipe(json, MachineDefinitionJson.decode);

const prepare = () =>
  pipe(
    MachinesJson,
    validateJson,
    E.map((machineJson) => Object.values(machineJson.machineTypes)),
    TE.fromEither,
    TE.chainFirstW(pullImages),
    TE.map((_images) => (preparedImages = _images))
  );

const Machines = {
  prepare,
  connect,
};

export default Machines;
