import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';
import MiniNav from './MiniNav';
import classes from './RootLayout.module.css';

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <hr />
      <MiniNav />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
