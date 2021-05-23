import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';

const MachineChoiceMenu = (props: { onMenuItemClick: (name: string) => void }) => {
  const possibleImages = ['node:12', 'redis', 'ubuntu'];
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Pick a machine
      </MenuButton>
      <MenuList>
        {possibleImages.map((imageName) => {
          return (
            <MenuItem key={imageName} onClick={() => props.onMenuItemClick(imageName)}>
              {imageName}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default MachineChoiceMenu;
