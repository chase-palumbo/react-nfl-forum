import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './ProfileSideBar.module.css';

const ProfileSideBar = (props) => {
  const { user } = useSelector((state) => state.user.userData);

  return (
    <div className={classes.profileContainer}>
      <div className={classes.sideBar}>
        <h1>{user}</h1>
        <hr />
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : classes.navlink)}
              to="/profile"
              end
            >
              Profile Details
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : classes.navlink)}
              to="/profile/threads"
            >
              My Threads
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : classes.navlink)}
              to="/profile/favorites"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.contentContainer}>
        {props.children}
      </div>
    </div>
  );
};

export default ProfileSideBar;
