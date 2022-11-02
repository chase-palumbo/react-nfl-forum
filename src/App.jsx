import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loader as homePageLoader } from './pages/Home';
import { loader as teamsTopicsLoader } from './pages/AllTeamsPage';

import { loader as generalThreadsLoader } from './pages/GeneralPage';
import { action as generalThreadsAction } from './pages/GeneralPage';
import { loader as generalPostsLoader } from './pages/GeneralPostPage';
import { action as generalPostsAction } from './pages/GeneralPostPage';
import { loader as teamsThreadsLoader } from './pages/TeamPage';
import { action as teamsThreadsAction } from './pages/TeamPage';
import { loader as teamsPostsLoader } from './pages/TeamPostPage';
import { action as teamsPostsAction } from './pages/TeamPostPage';
import { loader as playersThreadsLoader } from './pages/PlayersPage';
import { action as playersThreadsAction } from './pages/PlayersPage';
import { loader as playersPostsLoader } from './pages/PlayersPostPage';
import { action as playersPostsAction } from './pages/PlayersPostPage';
import Home from './pages/Home';
import RootLayout from './components/Layout/RootLayout';
import GeneralPage from './pages/GeneralPage';
import GeneralPostPage from './pages/GeneralPostPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ProfilePage from './pages/ProfilePage';
import PlayersPage from './pages/PlayersPage';
import PlayersPostPage from './pages/PlayersPostPage';
import AllTeamsPage from './pages/AllTeamsPage';
import TeamPage from './pages/TeamPage';
import TeamPostPage from './pages/TeamPostPage';
import ProfileDetails from './components/Profile/ProfileDetails';
import MyThreads from './components/Profile/MyThreads';
import FavoriteThreads from './components/Profile/FavoriteThreads';
import ErrorPage from './pages/ErrorPage';
import { loginAuth } from './store/auth-actions';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} loader={homePageLoader} />
      <Route path="/authentication" element={<AuthenticationPage />} />
      <Route path="/profile" element={<ProfilePage />}>
        <Route index element={<ProfileDetails />} />
        <Route path="threads" element={<MyThreads />} />
        <Route path="favorites" element={<FavoriteThreads />} />
      </Route>
      <Route path="/general" action={generalThreadsAction}>
        <Route index element={<GeneralPage />} loader={generalThreadsLoader} />
        <Route
          path=":genPostId"
          element={<GeneralPostPage />}
          loader={generalPostsLoader}
          action={generalPostsAction}
        />
      </Route>
      <Route path="teams">
        <Route index element={<AllTeamsPage />} loader={teamsTopicsLoader} />
        <Route
          path=":teamId"
          element={<TeamPage />}
          loader={teamsThreadsLoader}
          action={teamsThreadsAction}
        />
        <Route
          path=":teamId/:teamPostId"
          element={<TeamPostPage />}
          loader={teamsPostsLoader}
          action={teamsPostsAction}
        />
      </Route>
      <Route path="/players" action={playersThreadsAction}>
        <Route index element={<PlayersPage />} loader={playersThreadsLoader} />
        <Route
          path=":playersPostId"
          element={<PlayersPostPage />}
          loader={playersPostsLoader}
          action={playersPostsAction}
        />
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const uid = localStorage.getItem('uid');
    dispatch(loginAuth({ idToken: token, localId: uid }));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
