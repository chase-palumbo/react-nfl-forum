import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useActionData,
  useNavigation,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import ThreadTitle from './ThreadTitle';
import NewThreadForm from './NewThreadForm';
import PaginationNav from '../UI/PaginationNav';
import sortIcon from '../../img/icons/sortIcon.svg';
import classes from './Threads.module.css';

const getPaginationGroup = (curPage, allThreads) => {
  const startIndex = (curPage - 1) * 10;
  const endIndex = startIndex + 10;

  return allThreads.slice(startIndex, endIndex);
};

const sortThreads = (threads, ascending) => {
  return threads.sort((threadA, threadB) => {
    if (ascending) return threadA.timestamp > threadB.timestamp ? 1 : -1;
    else return threadA.timestamp < threadB.timestamp ? 1 : -1;
  });
};

const Threads = ({ topic, threads }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const userFavorites = useSelector((state) => state.user.userData.favorites);
  const [openThreadModal, setOpenThreadModal] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const actionData = useActionData();
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  const isSortedAsc =
    new URLSearchParams(location.search).get('sort') === 'asc';
  const sortedThreads = sortThreads(threads, isSortedAsc);
  const threadGroup = getPaginationGroup(paginationPage, sortedThreads);

  useEffect(() => {
    if (threads.length > 10) {
      const totalPages = Math.ceil(threads.length / 10);
      setPageCount(totalPages);
    }
  }, [threads]);

  useEffect(() => {
    if (actionData?.success) setOpenThreadModal(false);
  }, [actionData]);

  const changeSortingHandler = () => {
    navigate(`${location.pathname}?sort=${isSortedAsc ? 'desc' : 'asc'}`);
  };

  const pageNumberHandler = (e) => {
    const pageNumber = +e.target.textContent;

    setPaginationPage(pageNumber);
  };

  const nextPageHandler = () => {
    setPaginationPage((curPage) => curPage + 1);
  };

  const previousPageHandler = () => {
    setPaginationPage((curPage) => curPage - 1);
  };

  const createThreadHandler = () => {
    setOpenThreadModal(true);
  };

  const closeModalHandler = () => {
    setOpenThreadModal(false);
  };

  const threadsFound = threads.length > 0;

  const noThreadsFound = (
    <h1>No threads found! Add one by clicking 'Create a Thread'!</h1>
  );

  const createThreadContent = isLoggedIn ? (
    <NewThreadForm
      onClose={closeModalHandler}
      submitting={navigation.state === 'submitting'}
    />
  ) : (
    <p className={classes.signInText}>Sign-in to create a new thread!</p>
  );

  const threadsContent = (
    <div className={classes.threads}>
      <ul>
        {threadGroup.map((thread) => (
          <ThreadTitle
            key={thread.id}
            thread={thread}
            isFavorite={userFavorites.find(
              (favThread) => favThread.id === thread.id
            )}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className={classes.threadContainer}>
        <h1>/{topic}</h1>
        <button
          onClick={createThreadHandler}
          className={classes.createThreadButton}
        >
          Create a Thread
        </button>
        {openThreadModal && createThreadContent}

        <div className={classes.threadsNav}>
          <div className={classes.sortBox}>
            <p>
              <img src={sortIcon} />
              Sort:{' '}
              <span onClick={changeSortingHandler} className={classes.sortBtn}>
                {isSortedAsc ? 'By Newest' : 'By Oldest'}
              </span>
            </p>
          </div>

          {pageCount && (
            <div>
              <PaginationNav
                pageCount={pageCount}
                curPage={paginationPage}
                onNumberClick={pageNumberHandler}
                nextPage={nextPageHandler}
                previousPage={previousPageHandler}
              />
            </div>
          )}
        </div>

        {threadsFound && threadsContent}
        {!threadsFound && noThreadsFound}
      </div>
    </>
  );
};

export default Threads;
