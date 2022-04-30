import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

import {
  getAuth,
  signOut,
  } from 'firebase/auth';

const auth = getAuth();

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = async() => {
    await signOut(auth);
    
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;