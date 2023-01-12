import React, { useState } from 'react';
import {
  FormControl,
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  Card,
  CardActions,
  CardMedia,
} from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormDataInputLabel,
  FormDataInputError,
  FormDataInput,
  Color,
  FormText,
  ModalText,
} from 'core/enums';
import { addBoard, setShowForm } from 'features/boards/boardsSlice';
import BasicModal from 'components/BasicModal';
import { BoardPOSTRequest } from 'core/interfaces/dataModels';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IPropsBoardForm } from 'core/interfaces/props';
import styles from './styles';

const NewBoard = ({ headerDescription }: IPropsBoardForm) => {
  const dispatch = useAppDispatch();
  const { showForm } = useAppSelector((state) => state.boards);
  const handleClickForm = () => dispatch(setShowForm());

  const [openNotification, setOpenNotification] = useState(false);
  const handleClickModal = () => setOpenNotification(!openNotification);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoardPOSTRequest>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<BoardPOSTRequest> = ({ title, owner }) => {
    dispatch(
      addBoard({
        title,
        owner,
        users: [],
      })
    );
    reset();
    handleClickModal();
  };

  return (
    <>
      <Card sx={styles.card} onClick={handleClickForm}>
        <CardMedia sx={styles.media} />
        <CardActions>
          <AddBoxOutlinedIcon />
        </CardActions>
      </Card>
      <Dialog sx={styles.content} open={showForm} onClose={handleClickForm}>
        <Box sx={styles.modal}>
          <FormControl component="form" sx={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" component="h4" sx={styles.formHeader}>
              {headerDescription}
            </Typography>
            <Box sx={styles.inputField}>
              <TextField
                label={FormDataInputLabel.title}
                multiline
                {...register(FormDataInput.title, {
                  required: FormDataInputError.required,
                })}
              />
              {errors?.title && <Box style={{ color: Color.red }}>{errors.title.message}</Box>}
            </Box>
            <Box sx={styles.inputField}>
              <TextField
                label={FormDataInputLabel.description}
                multiline
                rows={8}
                {...register(FormDataInput.owner, {
                  required: FormDataInputError.required,
                })}
              />
              {errors?.owner && <Box style={{ color: Color.red }}>{errors.owner.message}</Box>}
            </Box>
            <Box sx={styles.buttons}>
              <Button variant="contained" sx={styles.btnConfirm} type="submit">
                {FormText.btnConfirm}
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

export default NewBoard;
