import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { removeToken, removeUserLogin } from 'services/helpers';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setUserLogin } from 'features/app/appSlice';
import { Images, Pages } from 'core/enums';
import styles from './styles';

const Profile = () => {
  const { userLogin } = useAppSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUserOut = () => {
    removeToken();
    removeUserLogin();
    dispatch(setUserLogin(null));
    navigate(Pages.main);
  };
  return (
    <Box sx={styles.profile}>
      <Header />
      <Box component="main" sx={styles.wrapper}>
        {userLogin ? (
          <Card sx={styles.card}>
            <CardMedia sx={styles.media} image={Images.Avatar} />
            <CardContent sx={styles.content}>
              <Typography sx={styles.name}>{userLogin}</Typography>
              <Divider light />
            </CardContent>
            <CardActions sx={styles.buttons}>
              <Button sx={styles.button} size="small">
                <ExitToAppIcon fontSize="large" onClick={signUserOut} />
              </Button>
            </CardActions>
          </Card>
        ) : (
          <Typography>Авторизируйтесь на сайте</Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Profile;
