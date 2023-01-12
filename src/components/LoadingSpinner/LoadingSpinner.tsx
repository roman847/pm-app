import React from 'react';
import { CircularProgress, Modal, Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import styles from './styles';

const LoadingSpinner = () => {
  const { isLoading } = useAppSelector((state) => state.app);
  return (
    <Modal open={isLoading}>
      <Box sx={styles}>
        <CircularProgress size={'10rem'} />
      </Box>
    </Modal>
  );
};

export default LoadingSpinner;
