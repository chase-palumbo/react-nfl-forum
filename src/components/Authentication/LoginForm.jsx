import useInput from '../../hooks/useInput';
import { emailValidation, passwordValidation } from '../../util/validation';
import classes from './LoginForm.module.css';

const LoginForm = (props) => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailValidation);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(passwordValidation);

  const formIsValid = emailIsValid.success && passwordIsValid.success;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className={classes.errorText}>{emailIsValid.textError}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      {passwordHasError && (
        <p className={classes.errorText}>{passwordIsValid.textError}</p>
      )}
      <button
        disabled={!formIsValid}
        type="submit"
        className={classes.submitBtn}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
