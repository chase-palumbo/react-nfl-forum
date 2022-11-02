import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    uid: '',
    user: '',
    img: '',
    favoriteTeam: '',
    totalPosts: 0,
    joined: '',
    recentThreads: [],
    favorites: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUserData(state, action) {
      state.userData = action.payload;
    },
    editFavTeam(state, action) {
      state.userData.favoriteTeam = action.payload;
    },
    editProfilePicture(state, action) {
      state.userData.img = action.payload;
    },
    incrementTotalPosts(state) {
      state.userData.totalPosts = state.userData.totalPosts + 1;
    },
    addThread(state, action) {
      if (state.userData.recentThreads.length === 10) {
        state.userData.recentThreads.shift();
      }
      state.userData.recentThreads.push(action.payload);
    },
    favoriteThread(state, action) {
      state.userData.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      const filteredFavs = state.userData.favorites.filter(
        (thread) => thread.id !== action.payload.id
      );
      state.userData.favorites = filteredFavs;
    },
    deleteThread(state, action) {
      const filteredThreads = state.userData.recentThreads.filter(
        (thread) => thread.id !== action.payload.id
      );
      state.userData.recentThreads = filteredThreads;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
