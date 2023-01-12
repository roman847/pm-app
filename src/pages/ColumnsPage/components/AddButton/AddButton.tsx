import React from 'react';
import { Button, Box } from '@mui/material';
import { IAddButton } from 'core/interfaces/props';

import { Color } from 'core/enums';

const AddButton = ({ variant, children, clickHandler }: IAddButton) => {
  return (
    <Box sx={{ width: '100%', paddingTop: '0.7rem' }}>
      <Button
        variant="text"
        sx={{ width: '100%', color: Color.black, letterSpacing: '0.1rem' }}
        onClick={clickHandler}
      >
        + Add {variant}
        {children && children}
      </Button>
    </Box>
  );
};
export default AddButton;
