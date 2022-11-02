import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../store/user';
import { sendUserFavorites } from '../../util/api';
import favoriteIcon from '../../img/icons/favoriteIcon.svg';
import classes from './SavedThread.module.css';

const SavedThread = ({ thread, isFavorite }) => {
  const dispatch = useDispatch();

  const removeFavHandler = async (threadData) => {
    dispatch(userActions.removeFavorite(threadData));

    await sendUserFavorites();
  };

  const favoriteButton = (
    <img src={favoriteIcon} onClick={removeFavHandler.bind(null, thread)} />
  );

  return (
    <div className={classes.threadItem}>
      <div className={classes.threadPosterBox}>
        <div className={classes.threadPosterText}>
          <p className={classes.threadUser}>{thread.user}</p>
          <p className={classes.threadTopic}>/{thread.topic}</p>
        </div>
      </div>
      <div className={classes.threadTitleBox}>
        <div className={classes.threadTitle}>
          <Link to={`/${thread.topic}/${thread.id}`}>{thread.title}</Link>
          {isFavorite && favoriteButton}
        </div>
      </div>
    </div>
  );
};

export default SavedThread;

// const jsx = (
//   <div className={classes.threadText}>
//     <Link to={`/${thread.topic}/${thread.id}`}>{thread.title}</Link>
//     {isFavorite && (
//       <img onClick={removeFavHandler.bind(null, thread)} src={favoriteIcon} />
//     )}
//   </div>
// );
