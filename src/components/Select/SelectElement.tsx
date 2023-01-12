import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ISelectElementProps } from 'core/interfaces/props';

const SelectElement: React.FC<Partial<ISelectElementProps>> = ({ options, value, onChange }) => {
  return (
    <Box sx={{ minWidth: 50, border: 'none', outline: 'none' }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          sx={{
            color: '#fff',
            height: 30,
          }}
        >
          {options?.map((item) => {
            return (
              <MenuItem value={item} key={window.crypto.randomUUID()}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectElement;
