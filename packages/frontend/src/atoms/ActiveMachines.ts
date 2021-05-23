import { atom } from 'recoil';
import { Duplex } from 'stream';

export interface ActiveMachine {
  id: string;
  name: string;
  startedAt: Date;
  stream: Duplex;
}
const ActiveMachines = atom<Map<string, ActiveMachine>>({
  key: 'activeMachines',
  default: new Map(),
});

export default ActiveMachines;
