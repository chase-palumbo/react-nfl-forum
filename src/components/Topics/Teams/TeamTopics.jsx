import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import threadIcon from '../../../img/icons/threadIcon.svg';
import classes from './TeamTopics.module.css';

const TeamTopics = ({ teamsData }) => {
  const teamsHalf1 = teamsData.slice(0, 16);
  const teamsHalf2 = teamsData.slice(16);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.topicsLayout}>
      <div className={classes.topicsContainer}>
        <ul>
          {teamsHalf1.map(({ teamName, threads }) => (
            <li key={Math.random()}>
              <div className={classes.topicItem}>
                <Link to={`/teams/${teamName}`}>/{teamName}</Link>
                <div className={classes.threadInfo}>
                  <img src={threadIcon} />
                  <p>{threads}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.topicsContainer}>
        <ul>
          {teamsHalf2.map(({ teamName, threads }) => (
            <li key={Math.random()}>
              <div className={classes.topicItem}>
                <Link to={`/teams/${teamName}`}>/{teamName}</Link>
                <div className={classes.threadInfo}>
                  <img src={threadIcon} />
                  <p>{threads}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default TeamTopics;


