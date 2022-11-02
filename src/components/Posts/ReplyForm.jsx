import { useState } from 'react';
import { Form, useActionData, useLocation } from 'react-router-dom';

import classes from './ReplyForm.module.css';

const ReplyForm = ({ onCancel, submitting, directReply }) => {
  const [submitTouched, setSubmitTouched] = useState(false);
  const actionData = useActionData();
  const location = useLocation();

  const submitClickedHandler = () => {
    setSubmitTouched(true);
  };

  return (
    <Form
      method="post"
      action={`${location.pathname}`}
      className={classes.replyControl}
    >
      <label htmlFor="post-text">
        {directReply ? `@${directReply}` : 'Write your reply here:'}
      </label>
      <input
        type="hidden"
        name="direct-reply"
        value={directReply || ''}
      />
      <textarea
        id="post-text"
        name="post-text"
        placeholder="Comment..."
        minLength={1}
        autoFocus
      />
      {submitTouched && actionData?.textError && (
        <p className={classes.errorText}>{actionData.textError}</p>
      )}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button
        type="submit"
        onClick={submitClickedHandler}
        disabled={submitting}
      >
        {submitting ? 'Loading' : 'Post'}
      </button>
    </Form>
  );
};

export default ReplyForm;
