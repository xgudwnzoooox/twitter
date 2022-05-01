import React, { useState } from "react";
import { authService} from "fbase";
import { useHistory } from "react-router-dom";

import {
  getAuth,
  signOut,
  updateProfile,
  } from 'firebase/auth';

const auth = getAuth();

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(auth);
    history.push("/");
  };
  
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(
        userObj, 
        { displayName: newDisplayName });
      }
    }

  return (
    <>
    <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;