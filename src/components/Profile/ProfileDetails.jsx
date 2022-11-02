import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cowboysLogo from '../../img/logos/cowboysLogo.png';
import { updateFavTeam } from '../../store/user-actions';
import editIcon from '../../img/icons/editIcon.svg';
import classes from './ProfileDetails.module.css';
import ImgSelectModal from './ImgSelectModal';

const ProfileDetails = () => {
  const [showImgSelectModal, setShowImgSelectModal] = useState(false);
  const [editingFavTeam, setEditingFavTeam] = useState(false);
  const userData = useSelector((state) => state.user.userData);

  const favTeamRef = useRef();
  const dispatch = useDispatch();

  const editProfilePictureHandler = () => {
    setShowImgSelectModal(true);
  };

  const closeEditProfilePicture = () => {
    setShowImgSelectModal(false);
  };

  const editTeamHandler = () => {
    setEditingFavTeam(true);
  };

  const confirmTeamHandler = () => {
    const enteredTeam = favTeamRef.current.value;
    dispatch(updateFavTeam(userData.uid, enteredTeam));

    setEditingFavTeam(false);
  };

  const cancelTeamHandler = () => {
    setEditingFavTeam(false);
  };

  const favTeamState = editingFavTeam ? (
    <span>
      <input type="text" id="favTeam" ref={favTeamRef} />
      <button onClick={confirmTeamHandler}>OK</button>
      <button onClick={cancelTeamHandler}>Cancel</button>
    </span>
  ) : (
    <span>
      {userData.favoriteTeam}
      <button onClick={editTeamHandler}>
        <img src={editIcon} alt="Edit Icon" /> Edit
      </button>
    </span>
  );

  return (
    <div className={classes.detailsContainer}>
      {showImgSelectModal && (
        <ImgSelectModal onClose={closeEditProfilePicture} />
      )}
      <div>
        <img
          className={classes.profilePicture}
          src={userData.img}
          alt="User Profile Picture"
        />
        <button className={classes.editPicBtn} onClick={editProfilePictureHandler}>
          Edit Profile Picture
        </button>
      </div>
      <div>
        <p>{userData.user}</p>
        <p className={classes.favTeam}>Favorite Team: {favTeamState}</p>
        <p>Total Posts: {userData.totalPosts}</p>
        <p>Joined: {userData.joined}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
