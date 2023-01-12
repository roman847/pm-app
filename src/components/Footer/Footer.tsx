import React from 'react';
import { AppBar, Box, Toolbar, Typography, Link, Container } from '@mui/material';
import { DEVELOPERS } from 'core/constants';
import { Images } from 'core/enums';
import styles from './styles';

const Footer: React.FC = () => {
  return (
    <AppBar sx={styles.container} component="footer" position="fixed">
      <Container maxWidth="xl">
        <Toolbar sx={styles.toolbar}>
          <Link href="https://rs.school/react" target="_blank" rel="noopener norefferer">
            <img src={Images.School} style={styles.icon} alt="School logo" />
          </Link>
          <Box sx={styles.namesContainer}>
            {DEVELOPERS.map(({ name, link }) => {
              return (
                <Link
                  href={link}
                  key={name}
                  sx={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </Link>
              );
            })}
          </Box>
          <Typography sx={styles.year}>2022</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
