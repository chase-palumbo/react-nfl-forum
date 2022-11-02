import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user';
import { sendThreadDeletion } from '../../util/api';

import classes from './MyThreads.module.css';
import SavedThread from './SavedThread';

const MyThreads = () => {
  const uid = useSelector((state) => state.user.userData.uid);
  const myThreads = useSelector((state) => state.user.userData.recentThreads);
  const dispatch = useDispatch();

  const deleteThreadHandler = async (threadData) => {
    dispatch(userActions.deleteThread(threadData));

    await sendThreadDeletion(uid, threadData);
  };

  if (!myThreads || myThreads.length === 0) {
    return (
      <h2 className={classes.noThreadsText}>
        No threads found. You can create your own with the "Create a Thread"
        button in the forums!
      </h2>
    );
  }

  return (
    <div className={classes.myThreadsContainer}>
      <ul>
        {myThreads.map((curThread) => (
          <li key={curThread.id}>
            <div className={classes.threadAction}>
              <p className={classes.threadDate}>{curThread.date}</p>
              <button onClick={deleteThreadHandler.bind(null, curThread)}>
                Delete Thread
              </button>
            </div>
            <SavedThread thread={curThread} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyThreads;
