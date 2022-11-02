import { useNavigate } from 'react-router-dom';

import generalImg from '../../img/topics/generalImg.png';
import teamsImg from '../../img/topics/teamsImg.png';
import playersImg from '../../img/topics/playerImg.png';
import classes from './HomeTopics.module.css';
import { useEffect } from 'react';

const HomeTopics = ({ forumData }) => {
  const navigate = useNavigate();

  const { generalData, teamsData, playersData } = forumData;

  const generalClickHandler = () => {
    navigate('/general');
  };

  const teamsClickHandler = () => {
    navigate('/teams');
  };

  const playersClickHandler = () => {
    navigate('/players');
  };

  return (
    <>
      <div className={classes.topicsContainer}>
        <div onClick={generalClickHandler} className={classes.topicBox}>
          <div>
            <img className={classes.generalImage} src={generalImg} />
          </div>
          <div className={classes.forumInfo}>
            <h2>General</h2>
            <p>A forum to talk about anything and everything NFL!</p>
            <div className={classes.forumData}>
              <p>Threads: {generalData.totalThreads}</p>
              <p>Posts: {generalData.totalPosts}</p>
            </div>
          </div>
        </div>

        <div onClick={teamsClickHandler} className={classes.topicBox}>
          <div>
            <img className={classes.teamsImage} src={teamsImg} />
          </div>
          <div className={classes.forumInfo}>
            <h2>Teams</h2>
            <p>Find your favorite team and join the discussion!</p>
            <div className={classes.forumData}>
              <p>Threads: {teamsData.totalThreads}</p>
              <p>Posts: {teamsData.totalPosts}</p>
            </div>
          </div>
        </div>

        <div onClick={playersClickHandler} className={classes.topicBox}>
          <div>
            <img className={classes.playerImage} src={playersImg} />
          </div>
          <div className={classes.forumInfo}>
            <h2>Players</h2>
            <p>A place to talk about players, highlights, and statistics!</p>
            <div className={classes.forumData}>
              <p>Threads: {playersData.totalThreads}</p>
              <p>Posts: {playersData.totalPosts}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTopics;
