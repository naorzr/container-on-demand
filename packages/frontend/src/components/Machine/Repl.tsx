import React, { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { Box } from '@chakra-ui/react';
import { Duplex } from 'stream';

const MachineRepl = (props: { machineStream?: Duplex }) => {
  const xtermRef = React.useRef<XTerm>(null);
  const { machineStream } = props;
  useEffect(() => {
    machineStream?.on('data', (data: unknown[]) => {
      const xtermCurrent = xtermRef.current;

      for (let i = 0; i < data.length; i++) {
        if (xtermCurrent) {
          xtermCurrent.terminal.write(String.fromCharCode(data[i] as number));
        }
      }
    });
  }, [machineStream]);
  return (
    <Box>
      <XTerm
        onData={(data) => {
          machineStream?.write(data);
        }}
        ref={xtermRef}
      />
    </Box>
  );
};

export default MachineRepl;
