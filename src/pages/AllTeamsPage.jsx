import { useLoaderData } from "react-router-dom";

import TeamTopics from "../components/Topics/Teams/TeamTopics";
import { getTeamsTopicData } from "../util/api";

const AllTeamsPage = () => {
  const loaderData = useLoaderData();

  return (
    <TeamTopics teamsData={loaderData} />
  )
};

export default AllTeamsPage;

export const loader = () => {
  return getTeamsTopicData();
};