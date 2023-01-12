import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentBoard,
  setEditForm,
  setEditBoardTitle,
  setEditBoardDesc,
} from 'features/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import EditBoard from 'components/EditBoard';
import { IBoard } from 'core/interfaces/dataModels';
import { Pages, Images, FormText, RemovedElementType } from 'core/enums';
import ConfirmationModal from 'components/ConfirmationModal';
import styles from './styles';

const Board = ({ owner, title, _id }: IBoard) => {
  const { editForm } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCurrentClick = () => {
    dispatch(setCurrentBoard(_id));
    navigate(`${Pages.boards}/${_id}/columns`);
  };
  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setEditForm());
    dispatch(setCurrentBoard(_id));
    dispatch(setEditBoardTitle(title));
    dispatch(setEditBoardDesc(owner));
  };
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Card sx={styles.card} onClick={handleCurrentClick}>
        <CardMedia sx={styles.media} image={Images.Board} />
        <CardContent sx={styles.content}>
          <Typography>{title}</Typography>
          <Typography>{owner}</Typography>
          <Divider light />
        </CardContent>
        <CardActions sx={styles.buttons}>
          <Button sx={styles.button} size="small" onClick={handleEditClick}>
            <EditIcon />
          </Button>
          <Button sx={styles.button} size="small" onClick={handleDeleteClick}>
            <DeleteForeverIcon />
          </Button>
        </CardActions>
      </Card>
      {editForm && <EditBoard headerDescription={FormText.editBoard} />}
      <ConfirmationModal
        open={isOpen}
        handleClose={closeModal}
        boardId={_id}
        type={RemovedElementType.board}
      />
    </>
  );
};

export default Board;
