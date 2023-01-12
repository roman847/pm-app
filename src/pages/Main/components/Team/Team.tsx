import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Box,
  Container,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DEVELOPERS } from 'core/constants';
import { LanguageNameSpace, MainPageText } from 'core/enums';
import styles from './styles';

const Team: React.FC = () => {
  const [t] = useTranslation(LanguageNameSpace.mainPage);
  return (
    <Box component="section" sx={styles.section}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" color="textPrimary" sx={styles.title}>
          {t(MainPageText.ourTeam)}
        </Typography>
        <Grid container spacing={4}>
          {DEVELOPERS.map(({ name, image, link }) => (
            <Grid item key={name} xs={12} sm={6} md={4}>
              <Card sx={styles.card}>
                <CardActionArea href={link} target="_blank" rel="noopener noreferrer">
                  <CardMedia component="img" height="200" width="100" image={image} alt={name} />
                  <CardContent>
                    <Typography>{t(name)}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
