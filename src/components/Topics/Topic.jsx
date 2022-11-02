import classes from './Topic.module.css';

const Topic = (props) => {
  const specificClass =
    props.title === 'General'
      ? classes.general
      : props.title === 'Teams'
      ? classes.teams
      : props.title === 'Players'
      ? classes.players
      : '';

  return (
    <div className={`${classes.topic} ${specificClass}`}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Topic;
