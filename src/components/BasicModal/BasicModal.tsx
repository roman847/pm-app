import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IPropsModal } from 'core/interfaces/props';
import styles from './styles';

const BasicModal = ({ openNotification, handleClickModal, text1, text2 }: IPropsModal) => {
  return (
    <Box component="div">
      <Modal open={openNotification} onClose={handleClickModal}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2">
            {text1}
          </Typography>
          <Typography sx={{ mt: 2 }}>{text2}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default BasicModal;
