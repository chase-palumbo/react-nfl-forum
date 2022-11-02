import { useLoaderData } from 'react-router-dom';

import { getPostData, sendNewPost } from '../util/api';
import Posts from '../components/Posts/Posts';

const GeneralPostPage = () => {
  const { threadTitle, postsData } = useLoaderData();

  return <Posts postsContent={postsData} title={threadTitle} />;
};

export default GeneralPostPage;

export const loader = ({ params }) => {
  const postId = params.genPostId;
  return getPostData('general', postId);
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const enteredText = formData.get('post-text');
  const directReplyTo = formData.get('direct-reply');

  if (enteredText.trim().length === 0)
    return { textError: 'Reply must contain text content.' };
  
  if (enteredText.length > 700) {
    return { textError: 'Max character limit is 700.'};
  }

  let textContent = enteredText;
  if (directReplyTo) {
    textContent = `@${directReplyTo} ${enteredText}`;
  }

  try {
    await sendNewPost('general', params.genPostId, textContent);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
