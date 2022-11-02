import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signUpAuth, loginAuth } from '../../store/auth-actions';
import { postAuthentication } from '../../util/api';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Modal from '../UI/Modal';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpBtnHandler = () => {
    setIsLogin(false);
  };

  const loginBtnHandler = () => {
    setIsLogin(true);
  };

  const closeModalHandler = () => {
    setAuthError(false);
  };

  const signUpHandler = async (email, username, password) => {
    try {
      setAuthError(false);
      const userAuth = await postAuthentication(email, password, 'sign-up');

      dispatch(signUpAuth(userAuth, username));
      navigate('/');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const loginHandler = async (email, password) => {
    try {
      setAuthError(false);
      const userAuth = await postAuthentication(email, password, 'login');

      dispatch(loginAuth(userAuth));
      navigate('/');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  return (
    <div className={classes.formContainer}>
      {authError && (
        <Modal onClose={closeModalHandler}>
          <div>
            <p>Authentication failed!</p>
            <p>{authError}</p>
            <button onClick={closeModalHandler}>OK</button>
          </div>
        </Modal>
      )}
      <div className={classes.buttons}>
        <button
          className={!isLogin ? classes.active : ''}
          onClick={signUpBtnHandler}
        >
          Sign up
        </button>
        <button
          className={isLogin ? classes.active : ''}
          onClick={loginBtnHandler}
        >
          Login
        </button>
      </div>
      {!isLogin && <SignUpForm onSignUp={signUpHandler} />}
      {isLogin && <LoginForm onLogin={loginHandler} />}
    </div>
  );
};

export default AuthForm;
