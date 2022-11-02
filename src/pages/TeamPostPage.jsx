import { useLoaderData } from 'react-router-dom';

import { getPostData, sendNewPost } from '../util/api';
import Posts from '../components/Posts/Posts';

const TeamPostPage = () => {
  const { threadTitle, postsData } = useLoaderData();

  return <Posts postsContent={postsData} title={threadTitle} />;
};

export default TeamPostPage;

export const loader = ({ params }) => {
  const teamId = params.teamId;
  const postId = params.teamPostId;
  return getPostData('teams', `${teamId}/${postId}`);
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const enteredText = formData.get('post-text');
  const directReplyTo = formData.get('direct-reply');
  const teamId = params.teamId;
  const postId = params.teamPostId;

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
    await sendNewPost('teams', `${teamId}/${postId}`, textContent);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
