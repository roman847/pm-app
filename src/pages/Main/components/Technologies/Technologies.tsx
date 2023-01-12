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
import { TECHNOLOGIES } from 'core/constants';
import { LanguageNameSpace, MainPageText } from 'core/enums';
import styles from './styles';

const Technologies: React.FC = () => {
  const [t] = useTranslation(LanguageNameSpace.mainPage);
  return (
    <Box component="section">
      <Container maxWidth="md" sx={styles.wrapper}>
        <Typography variant="h3" align="center" color="textPrimary" sx={styles.title}>
          {t(MainPageText.technologies)}
        </Typography>
        <Grid container spacing={4}>
          {TECHNOLOGIES.map(({ name, image, link }) => (
            <Grid item key={name} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea href={link} target="_blank" rel="noopener noreferrer">
                  <CardMedia component="img" height="220" width="100" image={image} alt={name} />
                  <CardContent>
                    <Typography>{name}</Typography>
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

export default Technologies;
