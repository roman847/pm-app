import React, { useEffect, useState, memo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { setOpen, setTask } from 'features/modalDescriptionTask/modalSlice';
import { updateTask, getTasks } from 'services/api/tasks/index';
import { IColumnProps } from 'core/interfaces/props';
import { ITaskItemData } from 'core/interfaces/dataModels';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { sortOrder } from 'services/helpers';
import { Color, ScenarioModalCreate, RemovedElementType } from 'core/enums';
import { setCurrentColumn } from 'features/columns/columnsSlice';
import { setLoadingStatus } from 'features/app/appSlice';
import ConfirmationModal from 'components/ConfirmationModal';
import ModalCreateColumn from 'pages/ColumnsPage/components/ModalColumnCreate/ModalCreateColumn';

const Column = ({ titleColumn, columnId, orderColumn }: IColumnProps) => {
  const [tasksList, setTasksList] = useState<ITaskItemData[]>([]);
  const [columnModalIsOpen, setColumnModalIsOpen] = useState(false);
  const { currentBoard } = useAppSelector((state) => state.boards);
  const { isOpened } = useAppSelector((state) => state.modalDescriptionTask);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingStatus(true));
    getTasks(currentBoard as string, columnId)
      .then((data) => setTasksList(data as ITaskItemData[]))
      .then(() => dispatch(setLoadingStatus(false)));
  }, [columnId, currentBoard, dispatch]);

  useEffect(() => {
    dispatch(setLoadingStatus(true));
    getTasks(currentBoard as string, columnId)
      .then((data) => setTasksList(data as ITaskItemData[]))
      .then(() => dispatch(setLoadingStatus(false)));
  }, [columnId, currentBoard, dispatch]);

  useEffect(() => {
    tasksList.forEach((item) =>
      updateTask(currentBoard as string, columnId, item._id, {
        title: item.title,
        order: item.order,
        description: item.description,
        columnId: columnId,
        userId: 0,
        users: [''],
      })
    );
  }, [tasksList, columnId, currentBoard]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination, draggableId }: DropResult = result;

    setTasksList(
      tasksList
        .map((task: ITaskItemData, index: number) => {
          if (task._id === draggableId) {
            return { ...task, order: tasksList[destination.index].order };
          } else if (destination.index === index) {
            return { ...task, order: source.index };
          }
          return task;
        })
        .sort(sortOrder)
    );
  };

  const clickTaskHandler = (task: ITaskItemData) => {
    dispatch(setOpen(!isOpened));
    dispatch(setTask(task));
    dispatch(
      setCurrentColumn({
        _id: columnId,
        title: titleColumn,
        order: orderColumn,
        boardId: currentBoard,
      })
    );
  };

  const openConfirmationModalForColumn = () => {
    setColumnModalIsOpen(true);
  };

  const closeModal = () => {
    setColumnModalIsOpen(false);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        padding: '1rem',
        background: Color.white,
        borderRadius: '0.7rem',
        boxShadow: '0px 0px 8px 0px rgba(0, 5, 9, 0.2)',
        transition: '0.4s',
        cursor: 'pointer',
        ':hover': { boxShadow: '0px 0px 16px 0px rgba(0, 5, 9, 0.5)' },
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
        onClick={openConfirmationModalForColumn}
      >
        &times;
      </Button>
      <Typography
        variant="h5"
        sx={{ color: Color.black, marginBottom: '1rem', letterSpacing: '0.1rem' }}
      >
        {titleColumn}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dropTaskArea">
          {(provided, snapshot) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  height: 40 * tasksList.length + 20 * tasksList.length,
                  background: snapshot.isDraggingOver ? Color.bgColor : Color.white,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasksList.length > 0 &&
                  tasksList.sort(sortOrder).map((item, index) => {
                    return (
                      <Draggable
                        key={window.crypto.randomUUID()}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onTouchStart={() => {
                                clickTaskHandler(item);
                              }}
                              onClick={() => {
                                clickTaskHandler(item);
                              }}
                              sx={{
                                width: '100%',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                outline: `2px solid #9faabd`,
                                borderRadius: '2px',
                                padding: '5px',
                                color: Color.black,
                                ':hover': {
                                  border: 'none',
                                },
                              }}
                              draggable={true}
                              style={{ ...provided.draggableProps.style }}
                            >
                              <Typography sx={{ fontSize: '20px' }}> {item.title}</Typography>
                            </Box>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </Box>
            );
          }}
        </Droppable>
      </DragDropContext>
      <ModalCreateColumn
        scenario={ScenarioModalCreate.task}
        columnId={columnId}
        order={tasksList.length > 0 ? tasksList.sort(sortOrder)[tasksList.length - 1].order : 0}
      />
      <ConfirmationModal
        open={columnModalIsOpen}
        handleClose={closeModal}
        boardId={currentBoard as string}
        columnId={columnId}
        type={RemovedElementType.column}
      />
    </Box>
  );
};
export default memo(Column);
