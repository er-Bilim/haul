import type { FC, PropsWithChildren } from 'react';
import Header from '@/components/Header/Header';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const MainLayout: FC<PropsWithChildren> = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
