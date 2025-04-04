import React, { useEffect } from 'react';
import { Header } from '../header';
import { NavBar } from '../nav-bar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Container } from '../container';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../../features/user/userSlice';
import { Profile } from '../profile';

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const isUserProfilePage = location.pathname.startsWith('/User/');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={4}>
          {/* Левая колонка – навигация */}
          <Grid item xs={3}>
            <NavBar />
          </Grid>
          {/* Центральная колонка – основное содержимое */}
          <Grid item xs={isUserProfilePage ? 9 : 6}>
            <Outlet />
          </Grid>
          {/* Правая колонка – профиль */}
          {!isUserProfilePage && (
            <Grid item xs={3}>
              <Profile />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
