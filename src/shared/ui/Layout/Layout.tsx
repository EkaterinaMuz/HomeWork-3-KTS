import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@widgets/Navigation/ui';

const Layout = () => {
  return (
    <>
      <Navigation />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
