import { VStack, Text, AlertIcon, Alert } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ActiveMachines from '../atoms/ActiveMachines';
import MachineRepl from '../components/Machine/Repl';

const Repl = () => {
  const { id } = useParams<{ id: string }>();
  const [activeMachines] = useRecoilState(ActiveMachines);

  return (
    <VStack>
      <Text fontWeight={'bold'}>{`Connected to ${id}`}</Text>
      <MachineRepl />
      {!activeMachines.has(id) && (
        <Alert status="warning">
          <AlertIcon />
          Your machine was closed due to inactivity
        </Alert>
      )}
    </VStack>
  );
};
export default Repl;
