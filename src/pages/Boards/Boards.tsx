import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import Search from 'components/Search';
import { IBoard } from 'core/interfaces/dataModels';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import NewBoard from 'components/NewBoard';
import Board from 'components/Board';
import Header from 'components/Header';
import { fetchBoards } from 'features/boards/boardsSlice';
import { setLoadingStatus } from 'features/app/appSlice';
import Footer from 'components/Footer';
import { FormText } from 'core/enums';
import styles from './styles';

const Boards: React.FC = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const filteredBoards = boards.filter((board: IBoard) => {
    return board.title.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(setLoadingStatus(true));
    dispatch(fetchBoards());
    dispatch(setLoadingStatus(false));
  }, [dispatch]);

  return (
    <Box sx={styles.boards}>
      <Header />
      <Box component="main" sx={styles.wrapper}>
        <Search value={value} setValue={setValue} />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {filteredBoards.map((item: IBoard) => (
              <Grid item key={item._id} xs={12} sm={6} md={3}>
                <Board {...item} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={3} alignItems="center">
              <NewBoard headerDescription={FormText.createNewBoard} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Boards;
