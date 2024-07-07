import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebasApp } from "../firebase";
import { signInSuccess } from "../../redux/user/userSlice";

export const OAuth = () => {
  const dispatch = useDispatch();
  const HandleGoogleClick = async () => {
    try {
      const auth = getAuth(firebasApp);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      console.log(result);
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("error with google account", error);
    }
  };
  return (
    <button
      type="button"
      className="uppercase p-2 rounded-lg bg-red-700 text-white"
      onClick={HandleGoogleClick}
    >
      continue with google
    </button>
  );
};
