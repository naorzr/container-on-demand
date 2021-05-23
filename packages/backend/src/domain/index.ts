import * as t from 'io-ts';
import { Duplex } from 'stream';

export const Image = t.string;
export const Repl = t.array(t.string);
export const Entrypoint = t.union([t.array(t.string), t.undefined]);
export const Machine = t.type(
  {
    image: Image,
    entrypoint: Entrypoint,
    repl: Repl,
  },
  'Machine'
);

export const MachineDefinitionJson = t.type({ machineTypes: t.record(t.string, Machine) });

export type Image = t.TypeOf<typeof Image>;
export type Entrypoint = t.TypeOf<typeof Entrypoint>;
export type Repl = t.TypeOf<typeof Repl>;
export type Machine = t.TypeOf<typeof Machine>;
export type MachineDefinitionJson = t.TypeOf<typeof MachineDefinitionJson>;

export interface Container {
  start: () => Promise<void>;
  remove: () => Promise<void>;
  stop: () => Promise<void>;
  exec: (
    options: {
      Cmd: Repl;
      onData: () => void;
      onStart: () => void;
    },
    dupStreamAttach: Duplex
  ) => Promise<void>;
}
