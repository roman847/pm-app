import React from 'react';
import { Box } from '@mui/material';
import Technologies from 'pages/Main/components/Technologies';
import Team from 'pages/Main/components/Team';
import Footer from 'components/Footer';
import Header from 'pages/Main/components/Header';
import { Color } from 'core/enums';
import MainContent from 'pages/Main/components/MainContent';

const Main = () => {
  return (
    <Box
      sx={{
        bgcolor: Color.bgColor,
      }}
    >
      <Header />
      <Box sx={{ marginTop: '5%' }}>
        <MainContent />
      </Box>
      <Technologies />
      <Box sx={{ paddingBottom: '10%' }}>
        <Team />
      </Box>
      <Footer />
    </Box>
  );
};

export default Main;
