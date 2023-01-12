import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModalDeleteBoardProps } from 'core/interfaces/props';
import { deleteBoard } from 'features/boards/boardsSlice';
import { useAppDispatch } from 'app/hooks';
import { ConfirmationModalText, LanguageNameSpace, RemovedElementType } from 'core/enums';
import { deleteFetchColumn } from 'features/columns/columnsSlice';
import { setLoadingStatus } from 'features/app/appSlice';
import { deleteTask } from 'services/api/tasks';
import { setOpen } from 'features/modalDescriptionTask/modalSlice';
import styles from './styles';

const ConfirmationModal = ({
  open,
  handleClose,
  boardId,
  columnId,
  taskId,
  type,
}: ModalDeleteBoardProps) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    if (type === RemovedElementType.board) {
      dispatch(setLoadingStatus(true));
      dispatch(deleteBoard(boardId));
      dispatch(setLoadingStatus(false));
      handleClose();
    }
    if (type === RemovedElementType.column) {
      dispatch(setLoadingStatus(true));
      dispatch(deleteFetchColumn({ boardId, columnId: columnId as string }));
      dispatch(setLoadingStatus(false));
      handleClose();
    }
    if (type === RemovedElementType.task) {
      dispatch(setLoadingStatus(true));
      deleteTask(boardId, columnId as string, taskId as string).finally(() =>
        dispatch(setLoadingStatus(false))
      );
      dispatch(setOpen(false));
      handleClose();
    }
  };
  const [t] = useTranslation(LanguageNameSpace.confirmationModal);
  return (
    <Modal open={open} onClose={handleClose} sx={styles.modal}>
      <Box sx={styles.window}>
        <Typography component="h4" variant="h4" sx={styles.title}>
          {type === RemovedElementType.board && t(ConfirmationModalText.messageBoard)}
          {type === RemovedElementType.column && t(ConfirmationModalText.messageColumn)}
          {type === RemovedElementType.task && t(ConfirmationModalText.messageTask)}
        </Typography>
        <Box sx={styles.buttonContainer}>
          <Button variant="contained" onClick={handleDeleteClick}>
            {t(ConfirmationModalText.buttonYes)}
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {t(ConfirmationModalText.buttonNo)}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
