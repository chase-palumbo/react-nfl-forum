import { useState, useEffect } from 'react';
import { useActionData, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Post from './Post';
import ReplyForm from './ReplyForm';
import PaginationNav from '../UI/PaginationNav';
import classes from './Posts.module.css';

const getPaginationGroup = (curPage, allPosts) => {
  const startIndex = (curPage - 1) * 10;
  const endIndex = startIndex + 10;

  return allPosts.slice(startIndex, endIndex);
};

const Posts = ({ postsContent, title }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [replyClicked, setReplyClicked] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const postGroup = getPaginationGroup(paginationPage, postsContent);

  const actionData = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    if (postsContent.length > 10) {
      const totalPages = Math.ceil(postsContent.length / 10);
      setPageCount(totalPages);
    }
  }, [postsContent]);

  useEffect(() => {
    if (actionData?.success) setReplyClicked(false);
  }, [actionData]);

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

  const replyToPostHandler = () => {
    setReplyClicked(true);
  };

  const cancelReplyHandler = () => {
    setReplyClicked(false);
  };

  const replyContent = isLoggedIn ? (
    <ReplyForm
      onCancel={cancelReplyHandler}
      submitting={navigation.state === 'submitting'}
    />
  ) : (
    <p className={classes.signInText}>Sign in to join the discussion!</p>
  );

  return (
    <>
      <button onClick={replyToPostHandler} className={classes.postReplyBtn}>
        Reply to Post
      </button>
      {replyClicked && replyContent}
      <h1 className={classes.threadTitle}>{title}</h1>
      {pageCount && (
        <PaginationNav
          pageCount={pageCount}
          curPage={paginationPage}
          onNumberClick={pageNumberHandler}
          nextPage={nextPageHandler}
          previousPage={previousPageHandler}
        />
      )}
      <div className={classes.postsContainer}>
        <ul>
          {postGroup.map((post) => (
            <Post
              key={post.id}
              username={post.user}
              img={post.img}
              joined={post.joined}
              totalPosts={post.totalPosts}
              date={post.date}
              time={post.time}
              text={post.text}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Posts;
