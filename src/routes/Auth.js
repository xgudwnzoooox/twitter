import React, { useState } from "react";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  } from 'firebase/auth';
  
const auth = getAuth();


const Auth = () => {
  
  const onSocialClick = async (event) => {
    const name = event.target.name;
    let provider;
    if (name === "google") {
    provider = new GoogleAuthProvider();
    } else if (name === "github") {
    provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;