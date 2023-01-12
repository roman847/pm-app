import React, { useState } from 'react';
import { FormControl, Box, Button, Typography, TextField, Dialog } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormDataInputLabel,
  FormDataInputError,
  FormDataInput,
  Color,
  FormText,
  ModalText,
} from 'core/enums';
import {
  setEditForm,
  setEditBoardTitle,
  setEditBoardDesc,
  updateBoard,
} from 'features/boards/boardsSlice';
import BasicModal from 'components/BasicModal';
import { BoardPOSTRequest } from 'core/interfaces/dataModels';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IPropsBoardForm } from 'core/interfaces/props';
import styles from './styles';

const EditBoard = ({ headerDescription }: IPropsBoardForm) => {
  const dispatch = useAppDispatch();
  const handleClickForm = () => dispatch(setEditForm());
  const { editForm, editBoard, currentBoard } = useAppSelector((state) => state.boards);
  const [openNotification, setOpenNotification] = useState(false);
  const handleClickModal = () => setOpenNotification(!openNotification);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardPOSTRequest>({ mode: 'onChange' });

  const objForEdit = {
    id: currentBoard,
    body: { title: editBoard.title, owner: editBoard.description, users: [] },
  };

  const onSubmit: SubmitHandler<BoardPOSTRequest> = () => {
    dispatch(updateBoard(objForEdit));
    handleClickForm();
  };

  const setEditTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setEditBoardTitle(e.target.value));
  const setEditDesc = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setEditBoardDesc(e.target.value));

  return (
    <>
      <Dialog sx={styles.content} open={editForm} onClose={handleClickForm}>
        <Box sx={styles.modal}>
          <FormControl component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" component="h4" sx={styles.formHeader}>
              {headerDescription}
            </Typography>
            <Box sx={styles.inputField}>
              <TextField
                value={editBoard.title}
                label={FormDataInputLabel.title}
                multiline
                {...register(FormDataInput.title, {
                  required: FormDataInputError.required,
                })}
                onChange={setEditTitle}
              />
              {errors?.title && <Box style={{ color: Color.red }}>{errors.title.message}</Box>}
            </Box>
            <Box sx={styles.inputField}>
              <TextField
                value={editBoard.description}
                label={FormDataInputLabel.description}
                multiline
                rows={8}
                {...register(FormDataInput.owner, {
                  required: FormDataInputError.required,
                })}
                onChange={setEditDesc}
              />
              {errors?.owner && <Box style={{ color: Color.red }}>{errors.owner.message}</Box>}
            </Box>
            <Box sx={styles.buttons}>
              <Button variant="contained" sx={styles.btnConfirm} type="submit">
                {FormText.btnEdit}
              </Button>
              <Button variant="contained" sx={styles.btnCancel} onClick={handleClickForm}>
                {FormText.btnCancel}
              </Button>
            </Box>
          </FormControl>
        </Box>
        <BasicModal
          openNotification={openNotification}
          handleClickModal={handleClickModal}
          text1={ModalText.addBoardCongratulations}
          text2={ModalText.addBoardAction}
        />
      </Dialog>
    </>
  );
};

export default EditBoard;
