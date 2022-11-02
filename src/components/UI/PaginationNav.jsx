import classes from './PaginationNav.module.css';

const PaginationNav = (props) => {
  const buttonsArr = generatePageButtons(props.pageCount);

  function generatePageButtons(count) {
    return [...Array(count)].map((_, i) => (
      <button
        key={i}
        className={props.curPage === i + 1 ? classes.activeBtn : ''}
        onClick={props.onNumberClick}
      >
        {i + 1}
      </button>
    ));
  }

  return (
    <div className={classes.pagination}>
      {props.curPage !== 1 && (
        <button onClick={props.previousPage}>{'<'}</button>
      )}
      {buttonsArr}
      {props.curPage !== props.pageCount && (
        <button onClick={props.nextPage}>{'>'}</button>
      )}
    </div>
  );
};

export default PaginationNav;
