import { useLoaderData } from 'react-router-dom';

import { getAllForumData } from '../util/api';
import HomeTopics from '../components/Topics/HomeTopics';

const Home = () => {
  const loaderData = useLoaderData();

  return <HomeTopics forumData={loaderData} />;
};

export default Home;

export const loader = () => {
  return getAllForumData();
};

