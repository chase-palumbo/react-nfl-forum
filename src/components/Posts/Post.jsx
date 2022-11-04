import { useState } from 'react';
import { useNavigation, useNavigate, useActionData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Post.module.css';
import ReplyForm from './ReplyForm';
import { useEffect } from 'react';

const Post = (props) => {
  const [directReplyClicked, setDirectReplyClicked] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const actionData = useActionData(); 
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) setDirectReplyClicked(false);
  }, [actionData]);

  const directReplyHandler = () => {
    if (!isLoggedIn) navigate('/authentication');

    setDirectReplyClicked(true);
  };

  const replyCancelHandler = () => {
    setDirectReplyClicked(false);
  };

  // FIX PROFILE PICTURE SRC ON VERCEL
  const VERCEL_PROFILE_PICTURE_SRC = props.img.replace('http://localhost:3000', 'https://react-nfl-forum.vercel.app');

  return (
    <>
      <li className={classes.postContainer}>
        <div className={classes.userInfoBox}>
          <img src={VERCEL_PROFILE_PICTURE_SRC} alt="Profile Picture" />
          <div className={classes.userInfoText}>
            <p>{props.username}</p>
            <p>Total Posts: {props.totalPosts}</p>
            <p>Joined: {props.joined}</p>
          </div>
        </div>
        <div className={classes.postInfoBox}>
          <p className={classes.postInfoDate}>
            {props.date}, {props.time}
          </p>
          <p>{props.text}</p>
          <button onClick={directReplyHandler}>Reply</button>
        </div>
      </li>
      {directReplyClicked && (
        <ReplyForm
          onCancel={replyCancelHandler}
          submitting={navigation.state === 'submitting'}
          directReply={props.username}
        />
      )}
    </>
  );
};

export default Post;
