import * as TE from 'fp-ts/TaskEither';
import { Entrypoint, Image, Machine, Repl, Container } from '../domain';
import { toError } from 'fp-ts/Either';
import Docker, { Exec, Container as DockerContainer } from 'dockerode';
import { Duplex } from 'stream';
const docker = new Docker({ port: 3007 });

const pullImage = (image: Image): TE.TaskEither<Error, unknown> =>
  TE.tryCatch(async () => {
    const stream = await docker.pull(`${image}`);
    console.log('pulling image', image);
    return new Promise((res, rej) => {
      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err: unknown, output: Record<string, string>[]) {
        if (err) {
          return rej(err);
        } else {
          return res(output);
        }
      }

      function onProgress(event: unknown) {
        console.log('progress', event);
      }
    });
  }, toError);

const pullImages = (machines: readonly Machine[]) =>
  TE.sequenceArray(machines.map(({ image }) => pullImage(image)));

const runExec = (container: DockerContainer) => async (
  options: {
    Cmd: Repl;
    onData: () => void;
    onStart: () => void;
  },
  dupStreamAttach: Duplex
) => {
  await new Promise<void>((resolve, reject) =>
    container.exec(
      { ...options, AttachStdin: true, AttachStdout: true, AttachStderr: true, Tty: true },
      function (err, exec?: Exec) {
        if (err) {
          reject(err);
        }

        if (exec) {
          options.onStart();
          exec.start(
            { Detach: false, Tty: true, stdin: true },
            function (err: unknown, stream?: Duplex) {
              if (err || !stream) {
                return reject(err);
              }

              dupStreamAttach.on('data', () => {
                options.onData();
                console.log('received data');
              });
              dupStreamAttach.pipe(stream);
              stream.pipe(dupStreamAttach);
            }
          );
          resolve();
        }
      }
    )
  );
};

const createContainer = async (props: {
  image: Image;
  entrypoint: Entrypoint;
}): Promise<Container> => {
  console.log('creating container');
  const container = await docker.createContainer({
    Image: props.image,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Entrypoint: props.entrypoint,
    OpenStdin: false,
    StdinOnce: false,
  });
  return {
    start: container.start.bind(container),
    stop: container.stop.bind(container),
    exec: runExec(container),
    remove: container.remove.bind(container),
  };
};

export { pullImages, pullImage, createContainer };
