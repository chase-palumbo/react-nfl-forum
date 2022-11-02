import { useLoaderData } from 'react-router-dom';

import { getThreads, sendNewThread } from '../util/api';
import Threads from '../components/Threads/Threads';

const PlayersPage = () => {
  const loaderData = useLoaderData();

  return <Threads topic="Players" threads={loaderData} />;
};

export default PlayersPage;

export const loader = () => {
  return getThreads('players');
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const post = formData.get('post');

  if (title.trim().length === 0 || post.trim().length === 0)
    return { textError: 'Please input valid text.' };

  if (title.length > 200) {
    return { textError: 'Max character limit for title text is 200.' };
  }

  if (post.length > 700) {
    return { textError: 'Max character limit for post text is 700.' };
  }

  try {
    await sendNewThread('players', { title: title, post: post });
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};
