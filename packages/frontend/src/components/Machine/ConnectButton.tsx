import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ActiveMachines from '../../atoms/ActiveMachines';
import React, { useState } from 'react';
import io from 'socket.io-client';
import { Button } from '@chakra-ui/react';
import MachineChoiceMenu from './Menu';
const ss = require('@sap_oss/node-socketio-stream');

const ConnectToMachineButton = () => {
  const history = useHistory();
  const [activeMachines, setActiveMachines] = useRecoilState(ActiveMachines);

  const [displayMenu, toggleDisplayMenu] = useState(false);

  const connectMachine = (imageName: string): Promise<string> => {
    const socket = io(`ws://localhost:3000`);

    return new Promise((res) => {
      socket.on('connect', () => {
        const _stream = ss.createStream();
        const socketId = socket.id;
        ss(socket).emit('connectMachine', _stream, { image: imageName });

        socket.on('disconnect', (reason) => {
          activeMachines.delete(socketId);
          setActiveMachines(new Map(activeMachines));
        });
        setActiveMachines(
          new Map(
            activeMachines.set(socket.id, {
              id: socket.id,
              name: imageName,
              startedAt: new Date(),
              stream: _stream,
            })
          )
        );
        res(socket.id);
      });

      socket.connect();
    });
  };
  return (
    <>
      {displayMenu ? (
        <MachineChoiceMenu
          onMenuItemClick={async (imageName) => {
            const id = await connectMachine(imageName);
            history.push(`/Machines/${id}`);
          }}
        />
      ) : (
        <Button onClick={() => toggleDisplayMenu(true)}>+</Button>
      )}
    </>
  );
};

export default ConnectToMachineButton;
