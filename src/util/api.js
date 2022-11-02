import store from '../store/index';
import defaultImg from '../img/logos/defaultImg.png';
import { updateTotalPosts } from '../store/user-actions';
import { userActions } from '../store/user';

const FIREBASE_DOMAIN =
  'https://react-http-requests-6446f-default-rtdb.firebaseio.com';

// INITIAL DATA ///////////////////////////////////////////////

export const getAllForumData = async () => {
  const generalData = await getForumData('general');
  const teamsData = await getTeamsForumData();
  const playersData = await getForumData('players');

  const forumData = { generalData, teamsData, playersData };

  return forumData;
};

const getForumData = async (topic) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/${topic}.json`);
  if (!response.ok) throw new Error(`Could not retrieve ${topic} forum data!`);

  const data = await response.json();

  let totalThreads = 0;
  let totalPosts = 0;

  const threadCount = Object.keys(data).length;
  if (threadCount) {
    totalThreads = threadCount;

    for (let thread in data) {
      const posts = Object.keys(data[thread].posts).length;
      totalPosts += posts;
    }
  }

  return {
    totalThreads,
    totalPosts,
  };
};

const getTeamsForumData = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/teams.json`);
  if (!response.ok) throw new Error('Could not retrieve teams forum data!');

  const data = await response.json();

  let totalThreads = 0;
  let totalPosts = 0;

  for (let topic in data) {
    const threadCount = Object.keys(data[topic]).length;
    if (threadCount) {
      totalThreads += threadCount;

      for (let thread in data[topic]) {
        const posts = Object.keys(data[topic][thread].posts).length;
        totalPosts += posts;
      }
    }
  }

  return {
    totalThreads,
    totalPosts,
  };
};

// THREADS/POSTS /////////////////////////////////////////////

export const getTeamsTopicData = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/teams.json`);
  if (!response.ok) throw new Error('Could not retrieve teams data.');

  const data = await response.json();

  const teamsData = [];
  for (let team in data) {
    teamsData.push({
      teamName: team,
      threads: Object.keys(data[team]).length,
    });
  }

  return teamsData;
};

export const getThreads = async (topic) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/${topic}.json`);
  if (!response.ok) throw new Error('Could not fetch threads.');

  const data = await response.json();
  if (data === null) throw new Error('Page not found!');

  const threads = [];
  for (let key in data) {
    threads.push({
      id: key,
      totalReplies: Object.keys(data[key].posts).length,
      ...data[key].thread,
    });
  }

  return threads;
};

export const getPostData = async (topic, postId) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/${topic}/${postId}.json`);
  if (!response.ok) throw new Error('Could not fetch posts.');

  const data = await response.json();
  if (data === null) throw new Error('Page not found!');

  const { posts, thread } = data;

  const threadTitle = thread.title;
  const postsData = [];
  for (let key in posts) {
    postsData.push({
      id: key,
      ...posts[key],
    });
  }

  return {
    threadTitle,
    postsData,
  };
};

export const sendNewPost = async (topic, threadId, postData) => {
  const userData = store.getState().user.userData;
  const newTotalPosts = userData.totalPosts + 1;

  const newPost = {
    topic: topic,
    text: postData,
    user: userData.user,
    img: userData.img,
    totalPosts: newTotalPosts,
    joined: userData.joined,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString().replace(/:\d+\s/, ' '),
    timestamp: Date.now(),
  };

  const response = await fetch(
    `${FIREBASE_DOMAIN}/${topic}/${threadId}/posts/.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    }
  );
  if (!response.ok) throw new Error('Could not send reply.');

  store.dispatch(updateTotalPosts(userData.uid, newTotalPosts));
};

export const sendNewThread = async (topic, threadData) => {
  const { user } = store.getState().user.userData;

  const newThread = {
    thread: {
      topic: topic,
      user: user,
      title: threadData.title,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().replace(/:\d+\s/, ' '),
      timestamp: Date.now(),
    },
  };

  const response = await fetch(`${FIREBASE_DOMAIN}/${topic}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newThread),
  });

  if (!response.ok) throw new Error('Could not create thread!');

  const data = await response.json();
  newThread.thread.id = data.name;

  store.dispatch(userActions.addThread(newThread.thread));

  try {
    await sendUserThreadData();
    await sendNewPost(topic, data.name, threadData.post);
  } catch (err) {
    console.log(err);
  }
};

// AUTH //////////////////////////////////////////////////////

export const postAuthentication = async (email, password, type) => {
  const SIGNUP_ENDPOINT =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrxLray0ezfPJaT9plPQurXqnHAYijinc';

  const SIGNIN_ENDPOINT =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrxLray0ezfPJaT9plPQurXqnHAYijinc';

  const url = type === 'sign-up' ? SIGNUP_ENDPOINT : SIGNIN_ENDPOINT;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    const errCode = error.code;
    const errMessage = error.message.replace('_', ' ');
    throw new Error(`${errCode}: ${errMessage}`);
  } 

  const data = await response.json();
  return data;
};

export const createUserData = async (uid, username) => {
  const newUserData = {
    uid: uid,
    user: username,
    img: defaultImg,
    favoriteTeam: '',
    totalPosts: 0,
    joined: new Date().toLocaleDateString(),
  };

  const response = await fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });
  if (!response.ok) throw new Error('Could not create user data!');

  newUserData.recentThreads = [];
  newUserData.favorites = [];

  return newUserData;
};

export const fetchUserData = async (uid) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`);
  if (!response.ok) throw new Error('Could not fetch user data!');

  const data = await response.json();

  let recentThreadsArr = [];
  if (data.recentThreads) {
    for (let thread in data.recentThreads) {
      recentThreadsArr.push({
        id: thread,
        ...data.recentThreads[thread],
      });
    }
  }

  let favoritesArr = [];
  if (data.favorites) {
    for (let thread in data.favorites) {
      favoritesArr.push({
        id: thread,
        ...data.favorites[thread],
      });
    }
  }

  data.recentThreads = recentThreadsArr;
  data.favorites = favoritesArr;
  return data;
};

// USER //////////////////////////////////////////////////////

export const updateUserData = async (uid, userData) => {
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${uid}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error('Could not update user data!');
};

export const sendUserThreadData = async () => {
  const { uid, recentThreads } = store.getState().user.userData;
  const threadsJsonData = {};

  recentThreads.forEach((thread) => {
    threadsJsonData[thread.id] = { ...thread };
  });

  try {
    await updateUserData(uid, { recentThreads: threadsJsonData });
  } catch (err) {
    console.log(err);
  }
};

export const sendUserFavorites = async () => {
  const { uid, favorites } = store.getState().user.userData;
  const threadsJsonData = {};

  favorites.forEach((thread) => {
    threadsJsonData[thread.id] = { ...thread };
  });

  try {
    await updateUserData(uid, { favorites: threadsJsonData });
  } catch (err) {
    console.log(err);
  }
};

export const sendThreadDeletion = async (uid, threadData) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/${threadData.topic}/${threadData.id}.json`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not delete thread from database!');
  }

  try {
    await sendUserThreadData();

    const { favorites } = store.getState().user.userData;
    if (favorites.find(thread => thread.id === threadData.id)) {
      store.dispatch(userActions.removeFavorite(threadData))
      await sendUserFavorites();
    } 
  } catch (err) {
    console.log(err);
  }
};
