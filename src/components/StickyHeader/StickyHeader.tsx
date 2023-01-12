import React from 'react';
import { useScrollTrigger } from '@mui/material';
import { StickyHeaderProps } from 'core/interfaces/props';

const StickyHeader = ({ children }: StickyHeaderProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'secondary' : 'primary',
  });
};

export default StickyHeader;
