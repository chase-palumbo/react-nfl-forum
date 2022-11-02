import { useLoaderData } from 'react-router-dom';

import Threads from '../components/Threads/Threads';
import { getThreads, sendNewThread } from '../util/api';

const GeneralPage = () => {
  const loaderData = useLoaderData();

  return <Threads topic="General" threads={loaderData} />;
};

export default GeneralPage;

export const loader = () => {
  return getThreads('general');
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
    await sendNewThread('general', { title: title, post: post });
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};
