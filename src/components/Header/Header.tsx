import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { SelectChangeEvent } from '@mui/material/Select';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Container from '@mui/material/Container';
import { changeLanguage } from 'i18next';
import HeaderButtons from 'components/Header/components/HeaderButtons';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setLang } from 'features/app/appSlice';
import SelectElement from 'components/Select/SelectElement';
import { LangList, Pages } from 'core/enums';
import StickyHeader from 'components/StickyHeader';

const Header = () => {
  const navigation = useNavigate();
  const { lang } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleHomeIcon = () => {
    navigation(Pages.main);
  };
  const handlerLang = async (e: SelectChangeEvent) => {
    dispatch(setLang(e.target.value));
    await changeLanguage(e.target.value);
  };

  return (
    <StickyHeader>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MapsHomeWorkIcon
              sx={{ display: { md: 'flex', cursor: 'pointer' }, mr: 1 }}
              onClick={handleHomeIcon}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              <SelectElement
                value={lang}
                onChange={handlerLang}
                options={[LangList.english, LangList.russian]}
              />
            </Box>
            <HeaderButtons />
          </Toolbar>
        </Container>
      </AppBar>
    </StickyHeader>
  );
};

export default Header;
