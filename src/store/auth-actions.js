import { createUserData, fetchUserData } from "../util/api";
import { authActions } from "./auth";
import { userActions } from "./user";

export const signUpAuth = (userAuth, username) => {
  return async dispatch => {
    try {
      const authToken = userAuth.idToken;
      const uid = userAuth.localId;

      dispatch(authActions.login({ token: authToken, uid: uid }));

      const userData = await createUserData(uid, username);

      dispatch(userActions.initUserData(userData));
    } catch (err) {
      console.log(err);
    }
  }
};

export const loginAuth = (userAuth) => {
  return async dispatch => {
    try {
      const authToken = userAuth.idToken;
      const uid = userAuth.localId;

      dispatch(authActions.login({ token: authToken, uid: uid }));

      const userData = await fetchUserData(uid); 
      
      dispatch(userActions.initUserData(userData));
    } catch (err) {
      console.log(err);
    }
  }
};

