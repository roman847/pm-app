import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { fetchColumns, createFetchColumn } from 'features/columns/columnsSlice';
import { createTask } from 'services/api/tasks/index';
import { sortOrder } from 'services/helpers';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import AddButton from 'pages/ColumnsPage/components/AddButton/AddButton';
import { AddButtonVariants, ScenarioModalCreate } from 'core/enums';
import { IModalCreate } from 'core/interfaces/props';

const ModalCreateColumn = ({ scenario, columnId, order }: IModalCreate) => {
  const [open, setOpen] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const { currentBoard } = useAppSelector((state) => state.boards);
  const { columns } = useAppSelector((state) => state.columns);

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (titleValue.length > 0) {
      if (scenario === ScenarioModalCreate.column) {
        dispatch(
          createFetchColumn({
            boardId: currentBoard,
            title: titleValue,
            order:
              columns.length > 0
                ? Array.from(columns).sort(sortOrder)[columns.length - 1].order + 1
                : 1,
          })
        );
        setOpen(false);
      } else if (scenario === ScenarioModalCreate.task) {
        if (descriptionValue.length > 0) {
          createTask({
            boardId: currentBoard as string,
            columnId: columnId as string,
            title: titleValue,
            description: descriptionValue,
            order: (order as number) + 1,
          }).then(() => dispatch(fetchColumns(currentBoard as string)));

          setOpen(false);
        }
      }
    } else {
      setOpen(false);
    }
  };

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleValue(e.target.value);
  };

  const onChangeDesckHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescriptionValue(e.target.value);
  };

  return (
    <Box sx={{ width: '200px' }}>
      <AddButton variant={AddButtonVariants.column} clickHandler={handleClickOpen} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {scenario === ScenarioModalCreate.task && 'Create task'}
          {scenario === ScenarioModalCreate.column && 'Create column'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={titleValue}
            onChange={(e) => {
              onChangeTitleHandler(e);
            }}
          />
          {scenario === ScenarioModalCreate.task && (
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={descriptionValue}
              onChange={(e) => {
                onChangeDesckHandler(e);
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClose}>confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ModalCreateColumn;
