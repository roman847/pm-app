import React from 'react';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageNameSpace, MainPageText, Pages } from 'core/enums';
import { isTokenExpired } from 'services/api';
import styles from './styles';

const Header = () => {
  const navigate = useNavigate();

  const [t] = useTranslation(LanguageNameSpace.mainPage);
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box sx={styles.buttonsContainer}>
            {isTokenExpired() && (
              <>
                <Button onClick={() => navigate(Pages.signIn)} variant="contained" color="success">
                  {t(MainPageText.signIn)}
                </Button>
                <Button onClick={() => navigate(Pages.signUp)} variant="contained" color="success">
                  {t(MainPageText.signUp)}
                </Button>
              </>
            )}
            {!isTokenExpired() && (
              <Button onClick={() => navigate(Pages.boards)} variant="contained" color="success">
                {t(MainPageText.boards)}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
