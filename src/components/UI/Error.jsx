import classes from './Error.module.css';

const Error = ({ errorDetails }) => {
  return (
    <main className={classes.errorInfo}>
      <h1>Error</h1>
      <p>{errorDetails.message}!  Please try again.</p>
    </main>
  );
};

export default Error;
