import React, { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ActiveMachines from '../../atoms/ActiveMachines';
import { Box } from '@chakra-ui/react';

const MachineRepl = () => {
  const xtermRef = React.useRef<XTerm>(null);
  const { id } = useParams<{ id: string }>();
  const [activeMachines] = useRecoilState(ActiveMachines);
  useEffect(() => {
    const _stream = activeMachines.get(id)?.stream;
    _stream?.on('data', (data: unknown[]) => {
      const xtermCurrent = xtermRef.current;

      for (let i = 0; i < data.length; i++) {
        if (xtermCurrent) {
          xtermCurrent.terminal.write(String.fromCharCode(data[i] as number));
        }
      }
    });
  }, []);
  return (
    <Box>
      <XTerm
        onData={(data) => {
          const _stream = activeMachines.get(id)?.stream;
          _stream?.write(data);
        }}
        ref={xtermRef}
      />
    </Box>
  );
};

export default MachineRepl;
