import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../../store/auth';
import footballIcon from '../../img/icons/footballIcon.svg';
import classes from './NavBar.module.css';

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.user.userData.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const signUpLink = (
    <li>
      <NavLink
        to="/authentication"
        className={(navData) => (navData.isActive ? classes.active : '')}
      >
        SIGN-UP/LOGIN
      </NavLink>
    </li>
  );

  const loggedInLinks = (
    <>
      <li>
        <NavLink
          to="/profile"
          className={(navData) => (navData.isActive ? classes.active : '')}
        >
          PROFILE
        </NavLink>
      </li>
      <li>
        <button onClick={logoutHandler}>LOGOUT</button>
      </li>
    </>
  );

  return (
    <header>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          <img src={footballIcon} alt='Football Icon' />
          <h1> REACT NFL FORUM</h1>
        </div>
        {isLoggedIn && (
          <h2 className={classes.welcomeText}>Welcome, {username}!</h2>
        )}
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={(navData) =>
                  navData.isActive ? classes.active : ''
                }
              >
                HOME
              </NavLink>
            </li>
            {isLoggedIn && loggedInLinks}
            {!isLoggedIn && signUpLink}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
