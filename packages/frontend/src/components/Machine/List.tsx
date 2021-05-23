import { ActiveMachine } from '../../atoms/ActiveMachines';
import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const MachineList = (props: {
  machines: Map<string, ActiveMachine>;
  onClick: (id: string) => void;
}) => {
  return (
    <HStack>
      {Array.from(props.machines).map(([id, machine]) => {
        return (
          <Box w={120} h={120} key={id}>
            <Box
              cursor={'pointer'}
              fontWeight={'bold'}
              color={'green'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              width={'100%'}
              height={'100%'}
              bgColor={'black'}
              onClick={() => props.onClick(id)}
            >
              <Text textAlign={'center'}>{machine.name}</Text>
            </Box>
            <Text fontSize={9} textAlign={'center'}>
              {'id: ' + machine.id}
            </Text>
            <Text fontSize={9} textAlign={'center'}>
              {'started at: ' + machine.startedAt}
            </Text>
          </Box>
        );
      })}
    </HStack>
  );
};

export default MachineList;
