import React from 'react';
import { useHistory } from 'react-router-dom';
import { Heading, HStack, VStack } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import ActiveMachines from '../atoms/ActiveMachines';
import MachineList from '../components/Machine/List';
import ConnectToMachineButton from '../components/Machine/ConnectButton';

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  const [activeMachines] = useRecoilState(ActiveMachines);

  return (
    <VStack spacing={10}>
      <Heading as="h2" size="3xl" isTruncated>
        {`There are ${activeMachines.size} active machines`}
      </Heading>
      <HStack>
        <MachineList
          machines={activeMachines}
          onClick={(id) => {
            history.push(`/Machines/${id}`);
          }}
        />
        <ConnectToMachineButton />
      </HStack>
    </VStack>
  );
};

export default Home;
