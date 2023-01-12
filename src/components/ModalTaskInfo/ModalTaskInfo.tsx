import { Box, Typography, Button, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { updateTask } from 'services/api/tasks/index';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setOpen } from 'features/modalDescriptionTask/modalSlice';
import { IModalTaskInfo } from 'core/interfaces/props';
import { ITaskItemData } from 'core/interfaces/dataModels';
import { Color, RemovedElementType } from 'core/enums';
import ConfirmationModal from '../ConfirmationModal';

const modalElement = document.querySelector('#modal-task');

const ModalTaskInfo = ({ isOpened }: IModalTaskInfo) => {
  const element = useMemo(() => document.createElement('div'), []);

  const dispatch = useAppDispatch();

  const { currentBoard } = useAppSelector((state) => state.boards);
  const { currentColumn } = useAppSelector((state) => state.columns);

  const { task } = useAppSelector((state) => state.modalDescriptionTask);
  const { description, title, boardId, columnId, _id } = task as ITaskItemData;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };
  const [titleField, setTitleField] = useState(title);

  useEffect(() => {
    setTitleField(title);
  }, [title]);

  useEffect(() => {
    if (isOpened) {
      modalElement?.appendChild(element);
      return () => {
        modalElement?.removeChild(element);
      };
    }
  }, [isOpened, element]);

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleField(e.target.value);
  };

  const onBlurHandler = () => {
    const { order, description, columnId, userId, users } = task;
    if (titleField.length > 0) {
      updateTask(currentBoard as string, currentColumn._id, task._id, {
        title: titleField,
        order: order,
        description: description,
        columnId: columnId,
        userId: userId,
        users: users,
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0px',
        right: '0',
        background: 'white',
        padding: '2rem 2rem',
        width: '320px',
        height: '700px',
        transition: '0.4s',
        transform: !isOpened ? 'translateX(320px)' : 'translateX(200wh)',
        boxShadow: '0px 0px 8px 0px rgba(0, 5, 9, 0.2)',
        zIndex: '1111111',
      }}
    >
      <Button
        variant="text"
        sx={{
          position: 'absolute',
          top: '-1rem',
          right: '-1rem',
          fontSize: '2rem',
          color: Color.black,
          letterSpacing: '0.1rem',
          cursor: 'pointer',
          transition: '0.4s',
          ':hover': {
            background: 'none',
            opacity: '0.7',
          },
        }}
        onClick={() => dispatch(setOpen(false))}
      >
        &times;
      </Button>
      <TextField
        sx={{ color: 'red' }}
        margin="dense"
        id="name"
        type="text"
        fullWidth
        size="medium"
        variant="standard"
        value={titleField}
        onChange={(e) => {
          onChangeTitleHandler(e);
        }}
        onBlur={() => onBlurHandler()}
      />

      <Typography variant="h5" sx={{ marginTop: '50px', fontWeight: '700' }}>
        Description
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: '400', marginTop: '20px' }}>
        {description}
      </Typography>
      <Box sx={{ marginTop: '50px', display: 'flex', gap: '1rem' }}>
        <Button
          variant="contained"
          onClick={() => {
            if (titleField.length > 0) {
              onBlurHandler();
              dispatch(setOpen(false));
            }
          }}
        >
          update
        </Button>
        <Button variant="contained" onClick={() => setIsConfirmationOpen(true)}>
          Remove
        </Button>
      </Box>

      <ConfirmationModal
        open={isConfirmationOpen}
        handleClose={closeConfirmation}
        boardId={boardId}
        columnId={columnId}
        taskId={_id}
        type={RemovedElementType.task}
      />
    </Box>
  );
};
export default ModalTaskInfo;
