import { useDispatch, useSelector } from 'react-redux';

import Modal from '../UI/Modal';
import { updateProfilePicture } from '../../store/user-actions';
import classes from './ImgSelectModal.module.css';
import teamLogos from '../../util/teamLogos';


const ImgSelectModal = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector(state => state.user.userData.uid);

  const imgClickHandler = (e) => {
    const newImgSrc = e.target.src;
    dispatch(updateProfilePicture(uid, newImgSrc));

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <ul className={classes.imgContainer}>
        {teamLogos.map((logoObj) => (
          <li key={logoObj.id}>
            <img src={logoObj.img} onClick={imgClickHandler} />
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default ImgSelectModal;
