import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import ProfileSideBar from "../components/Profile/ProfileSideBar";


const ProfilePage = () => {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn)
      navigate('/');
  }, [isLoggedIn]);

  return (
    <>
      <ProfileSideBar>
        <Outlet />
      </ProfileSideBar>
    </>
  )
};

export default ProfilePage;