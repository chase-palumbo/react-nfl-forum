import useInput from '../../hooks/useInput';
import {
  emailValidation,
  usernameValidation,
  passwordValidation,
} from '../../util/validation';
import classes from './SignUpForm.module.css';

const SignUpForm = (props) => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailValidation);

  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    inputChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput(usernameValidation);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(passwordValidation);

  const formIsValid =
    emailIsValid.success && usernameIsValid.success && passwordIsValid.success;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    props.onSignUp(enteredEmail, enteredUsername, enteredPassword);
  };

  return (
    <>
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          {usernameHasError && (
            <p className={classes.errorText}>{usernameIsValid.textError}</p>
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
          {passwordHasError && (
            <p className={classes.errorText}>{passwordIsValid.textError}</p>
          )}
        </div>
        <button
          disabled={!formIsValid}
          type="submit"
          className={classes.submitBtn}
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
