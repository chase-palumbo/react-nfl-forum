import { userActions } from './user';
import { updateUserData } from '../util/api';

export const updateFavTeam = (uid, favTeam) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.editFavTeam(favTeam));

      await updateUserData(uid, { favoriteTeam: favTeam });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProfilePicture = (uid, imgSrc) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.editProfilePicture(imgSrc));

      await updateUserData(uid, { img: imgSrc });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTotalPosts = (uid, newTotal) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.incrementTotalPosts());

      await updateUserData(uid, { totalPosts: newTotal });
    } catch (err) {
      console.log(err);
    }
  };
};

