import { useLoaderData } from 'react-router-dom';

import { getPostData, sendNewPost } from '../util/api';
import Posts from '../components/Posts/Posts';

const PlayersPostPage = () => {
  const { threadTitle, postsData } = useLoaderData();

  return <Posts postsContent={postsData} title={threadTitle} />;
};

export default PlayersPostPage;

export const loader = ({ params }) => {
  const postId = params.playersPostId;
  return getPostData('players', postId);
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const enteredText = formData.get('post-text');
  const directReplyTo = formData.get('direct-reply');

  if (enteredText.trim().length === 0)
    return { textError: 'Reply must contain text content.' };

  if (enteredText.length > 700) {
    return { textError: 'Max character limit is 700.' };
  }

  let textContent = enteredText;
  if (directReplyTo) {
    textContent = `@${directReplyTo} ${enteredText}`;
  }

  try {
    await sendNewPost('players', params.playersPostId, textContent);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
