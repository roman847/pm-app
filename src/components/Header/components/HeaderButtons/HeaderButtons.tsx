import { Box, Button } from '@mui/material';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeaderText, LanguageNameSpace, Pages } from 'core/enums';
import { removeToken, removeUserLogin } from 'services/helpers';
import { setUserLogin } from 'features/app/appSlice';
import { useAppDispatch } from 'app/hooks';
import { setShowForm } from 'features/boards/boardsSlice';
import styles from './styles';

const HeaderButtons = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signUserOut = () => {
    removeToken();
    removeUserLogin();
    dispatch(setUserLogin(null));
    navigate(Pages.main);
  };

  const [t] = useTranslation(LanguageNameSpace.header);
  return (
    <Box sx={styles.container}>
      <Button
        onClick={() => {
          navigate(Pages.boards);
          dispatch(setShowForm());
        }}
        variant="contained"
        color="success"
      >
        {t(HeaderText.createNewBoard)}
      </Button>
      <Button onClick={() => navigate(Pages.profile)} variant="contained" color="success">
        {t(HeaderText.profile)}
      </Button>
      <ExitToAppIcon fontSize="large" onClick={signUserOut} sx={styles.exit} />
    </Box>
  );
};

export default HeaderButtons;
