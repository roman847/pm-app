import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ColumnsPage from 'pages/ColumnsPage';
import { Pages } from 'core/enums';
import Main from 'pages/Main';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import Boards from 'pages/Boards';
import Profile from 'pages/Profile';
import ProtectedRoute from 'components/ProtectedRoute';
import { useAppSelector } from 'app/hooks';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.app);
  const { currentBoard } = useAppSelector((state) => state.boards);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={`${Pages.boards}/${currentBoard}${Pages.columns}`}
            element={<ColumnsPage />}
          />
          <Route path={Pages.main} element={<Main />} />
          <Route path={Pages.boards} element={<Boards />} />
          <Route element={<ProtectedRoute isLoggedIn={!isLoggedIn} />}>
            <Route path={Pages.signUp} element={<SignUp />} />
            <Route path={Pages.signIn} element={<SignIn />} />
          </Route>
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path={Pages.profile} element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <LoadingSpinner />
    </>
  );
}

export default App;
