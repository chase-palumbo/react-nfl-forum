import { useLocation, Link } from 'react-router-dom';

import classes from './MiniNav.module.css';

const MiniNav = () => {
  const location = useLocation();
  const segments =
    location.pathname === '/' ? ['home'] : location.pathname.split('/');
  const pageLinks = segments.map((segment) =>
    segment === '' ? 'home' : segment
  );

  const miniNavHandler = (segmentName) => {
    const segmentIndex = pageLinks.indexOf(segmentName);
    let path;
    if (segmentIndex === 0) path = '/';
    else {
      const segmentPathArr = segments.slice(0, segmentIndex + 1);
      path = segmentPathArr.join('/'); 
    }
    return path;
  };

  return (
    <div className={classes.miniNav}>
      <ul>
        {pageLinks.map((segment) => (
          <li key={segment}>
            <div className={classes.segment}>
              <p>{'>'}</p>
              <Link
                className={classes.segmentLink}
                to={miniNavHandler.bind(null, segment)()}
              >
                {segment}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniNav;
