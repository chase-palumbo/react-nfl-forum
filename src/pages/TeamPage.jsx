import { useLoaderData, useParams } from 'react-router-dom';

import Threads from '../components/Threads/Threads';
import { getThreads, sendNewThread } from '../util/api';

const TeamPage = () => {
  const loaderData = useLoaderData();
  const params = useParams();

  const capitalizeTeamName = (teamName) =>
    teamName.replace(teamName[0], teamName[0].toUpperCase());

  return (
    <Threads topic={capitalizeTeamName(params.teamId)} threads={loaderData} />
  );
};

export default TeamPage;

export const loader = ({ params }) => {
  const teamId = params.teamId;
  return getThreads(`teams/${teamId}`);
};

export const action = async ({ request, params }) => {
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
    await sendNewThread(`teams/${params.teamId}`, { title: title, post: post });
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};
