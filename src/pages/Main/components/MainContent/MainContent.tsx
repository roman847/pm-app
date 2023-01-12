import React from 'react';
import { Box, Button, Card, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageNameSpace, MainPageText, Pages } from 'core/enums';
import { useAppSelector } from 'app/hooks';

const MainContent: React.FC = () => {
  const [t] = useTranslation(LanguageNameSpace.mainPage);
  const { isLoggedIn } = useAppSelector((state) => state.app);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate(isLoggedIn ? Pages.boards : Pages.signIn);
  };
  return (
    <Box component="main">
      <Container fixed>
        <Grid container>
          <Grid item md={6}>
            <Box>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {t(MainPageText.title)}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {t(MainPageText.description)}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleGetStartedClick}>
                {t(MainPageText.getStarted)}
              </Button>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                width="300"
                image="images/main.jpg"
                alt="workTeam"
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainContent;
