import React, { useState } from "react";
import { authService} from "fbase";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signOut,
  updateProfile,
  } from 'firebase/auth';
import { ref } from "firebase/storage";

const auth = getAuth();

const Profile = ({ userObj, refreshUser, setScreen }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
    setScreen((prev)=>{
      prev++
    })
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
        authService.currentUser, 
        { displayName: newDisplayName });
      
      refreshUser();
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