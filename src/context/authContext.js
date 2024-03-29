import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../config/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [emailIsInUse, setEmailIsInUse] = useState(false);
  const [someError, setSomeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();

  /* --------- register to firebase--------------- */
  const register = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      redirect("profile/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setEmailIsInUse(true);
      console.log("Create User errorMessage: ", errorMessage, errorCode);
      // ..
    }
  };

  /* --------- login to firebase --------------- */
  const login = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
      redirect("/");
    } catch (error) {
      setUser(null);
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password" || !password) {
        setPwError(true);
      } else if (errorCode === "auth/user-not-found" || !email) {
        setEmailError(true);
      } else {
        setSomeError(true);
      }
      setLoading(false);

      console.log("errorCode: ", errorCode);
      console.log("Login User errorMessage: ", errorMessage);
    }
  };

  const checkIfUserLoggedIn = () => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setUser(user);
        setLoading(false);
      } else {
        // User is signed out
        setUser(null);
        setLoading(false);
      }
    });
  };

  /* ---------- check if user is logged in ----------- */
  useEffect(
    () => {
      checkIfUserLoggedIn();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
    // console.log("user :>> ", user);

  const value = {
    user,
    setUser,
    register,
    login,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    pwError,
    setPwError,
    emailIsInUse,
    setEmailIsInUse,
    setEmailError,
    emailError,
    someError,
    setSomeError,
    loading,
    setLoading,
  };
  // console.log("user", user);
  // console.log('loading', loading)
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
