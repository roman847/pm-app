import React, { useEffect, useState, memo } from 'react';
import { Box } from '@mui/material';
import { putColumn } from 'services/api/columns';
import ModalCreateColumn from 'pages/ColumnsPage/components/ModalColumnCreate/ModalCreateColumn';
import { sortOrder } from 'services/helpers';
import Footer from 'components/Footer/Footer';
import { fetchColumns } from 'features/columns/columnsSlice';
import { ScenarioModalCreate } from 'core/enums';
import { IColumnItem } from 'core/interfaces/props';
import Column from 'pages/ColumnsPage/components/Column/Column';
import Header from 'components/Header';
import ModalTaskInfo from 'components/ModalTaskInfo/ModalTaskInfo';
import { useAppSelector, useAppDispatch } from 'app/hooks';

const ColumnsPage = () => {
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const [currentColumns, setCurrentColumns] = useState<IColumnItem[]>(Array.from(columns));
  const [currentCard, setCurrentCard] = useState<IColumnItem>({
    _id: '',
    title: '',
    order: 0,
    boardId: '',
  });
  const { isOpened } = useAppSelector((state) => state.modalDescriptionTask);
  const { currentBoard } = useAppSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchColumns(currentBoard as string));
  }, [currentBoard, dispatch]);

  useEffect(() => {
    setCurrentColumns(Array.from(columns));
  }, [columns]);

  useEffect(() => {
    currentColumns.forEach((item) =>
      putColumn(currentBoard as string, item._id, { title: item.title, order: item.order })
    );
  }, [currentBoard, currentColumns]);

  const dragStartHandle = (e: React.MouseEvent<HTMLElement>, column: IColumnItem) => {
    setTimeout(() => {
      setCurrentCard(column);
    }, 0);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const dropHandle = (e: React.DragEvent<HTMLElement>, column: IColumnItem) => {
    e.preventDefault();

    setCurrentColumns(
      currentColumns.map((item) => {
        if (item._id === column._id) {
          return { ...item, order: currentCard.order };
        }
        if (item._id === currentCard._id) {
          return { ...item, order: column.order };
        }
        return item;
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          height: '98vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Header></Header>
        <div
          style={{
            position: 'relative',
            width: columns.length > 0 ? 520 * columns.length + 40 * columns.length + 300 : '100wh',
            margin: '0 auto',
            height: '100vh',
            display: 'flex',
            gap: '40px',
            flexWrap: 'nowrap',
            justifyContent: 'start',
            padding: '150px 200px',
            overflowY: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <ModalTaskInfo isOpened={isOpened} />

          {currentColumns.length > 0 &&
            currentColumns.sort(sortOrder).map((item: IColumnItem) => {
              return (
                <div
                  key={window.crypto.randomUUID()}
                  style={{
                    width: '420px',
                    padding: '20px 20px',
                    marginTop: '20px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                  draggable={true}
                  onDragStart={(e) => dragStartHandle(e, item)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandle(e, item)}
                >
                  <Column titleColumn={item.title} columnId={item._id} orderColumn={item.order} />
                </div>
              );
            })}
          <Box
            sx={{
              width: '30%',
              height: '2rem',
              borderRadius: '0.7rem',
            }}
          >
            <ModalCreateColumn scenario={ScenarioModalCreate.column} />
          </Box>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default memo(ColumnsPage);
