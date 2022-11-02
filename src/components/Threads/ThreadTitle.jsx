import { Link, useLocation } from 'react-router-dom';

import { userActions } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import commentIcon from '../../img/icons/commentIcon.svg';
import starIcon from '../../img/icons/starIcon.svg';
import favoriteIcon from '../../img/icons/favoriteIcon.svg';
import classes from './ThreadTitle.module.css';
import { sendUserFavorites } from '../../util/api';

const ThreadTitle = ({ thread, isFavorite }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const dispatch = useDispatch();

  const favoriteHandler = async (threadData) => {
    if (isFavorite) 
      dispatch(userActions.removeFavorite(threadData));
    else dispatch(userActions.favoriteThread(threadData));

    await sendUserFavorites();
  };

  const favoriteButtonIcon = isFavorite ? favoriteIcon : starIcon;

  const favoriteButton = (
    <img
      src={favoriteButtonIcon}
      onClick={favoriteHandler.bind(null, thread)}
    />
  );

  return (
    <>
      <li className={classes.listItem}>
        <div className={classes.threadPosterBox}>
          <div>
            <p>{thread.user}</p>
          </div>
        </div>
        <div className={classes.threadTitleBox}>
          <div className={classes.threadTitle}>
            <Link to={`${location.pathname}/${thread.id}`}>{thread.title}</Link>
            {isLoggedIn && favoriteButton}
          </div>
          <div className={classes.totalReplies}>
            <img src={commentIcon} alt="Comments: " />
            <span>{thread.totalReplies}</span>
          </div>
        </div>
        <div className={classes.threadDateBox}>
          <p className={classes.threadDateText}>{thread.date}</p>
          <p className={classes.threadDateText}>{thread.time}</p>
        </div>
      </li>
    </>
  );
};

export default ThreadTitle;

// const jsx = (
//   <li className={classes.listItem}>
//     <div className={classes.threadPoster}>
//       <p>{props.user}</p>
//     </div>
//     <div className={classes.threadTitle}>
//       <Link to={`${location.pathname}/${props.id}`}>{props.title}</Link>
//     </div>
//     <div className={classes.threadDate}>
//       <div>{props.date}</div>
//       <div>{props.time}</div>
//     </div>
//   </li>
// );
