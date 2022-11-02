import { useState } from 'react';
import { Form, useActionData, useLocation } from 'react-router-dom';

import Modal from '../UI/Modal';
import classes from './NewThreadForm.module.css';

const NewThreadForm = ({ onClose, submitting }) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  const location = useLocation();
  const actionData = useActionData();

  const submitTouchedHandler = () => {
    setSubmitTouched(true);
  };

  return (
    <Modal onClose={onClose}>
      <div className={classes.formContainer}>
        <h1>/general</h1>
        <hr />
        {submitTouched && actionData?.textError && (
          <p className={classes.errorText}>{actionData.textError}</p>
        )}
        <Form
          method="post"
          action={`${location.pathname}`}
          className={classes.formControl}
        >
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title..."
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="post">Post:</label>
            <textarea id="post" name="post" placeholder="Comment..."></textarea>
          </div>
          <div className={classes.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={classes.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={classes.submitBtn}
              onClick={submitTouchedHandler}
            >
              {submitting ? 'Loading...' : 'Create Thread'}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewThreadForm;
