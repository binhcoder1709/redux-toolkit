import { signInWithPopup } from "firebase/auth";
import React from "react";
import { GoogleProvider, auth } from "../firebase/firebase.config";

export default function LoginWithGoogle() {
  const loginWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((res) => console.log(res.user.displayName))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <img
          onClick={loginWithGoogle}
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt=""
        />
      </div>
    </>
  );
}
