import { useSelector } from 'react-redux';

import SavedThread from './SavedThread';

import classes from './FavoriteThreads.module.css';

const FavoriteThreads = () => {
  const { favorites } = useSelector((state) => state.user.userData);

  if (!favorites || favorites.length === 0) {
    return <h2 className={classes.noFavTitle}>No favorites yet!  Click the star icon next to a thread title to favorite it!</h2>
  }

  return (
    <div className={classes.favThreadsContainer}>
      <ul>
        {favorites.map((curThread) => (
          <li key={curThread.id}>
            <SavedThread thread={curThread} isFavorite={true} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteThreads;
