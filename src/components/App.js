import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "firebase/auth";



function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [screen, setScreen] = useState(0);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });

        if(user.displayName === null){
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={Boolean(userObj)}
        userObj={userObj}
        setScreen= {setScreen}
      />
      ) : (
        "Initializing..."
      )}
    </>
  );
}
export default App;