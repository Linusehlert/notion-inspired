import { setUserLogOut } from "../../features/userSlice";
import { auth, db } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const logout = () => {
    setError(null);
    setIsPending(true);
    //sign user out
    signOut(auth)
      .then(() => {
        console.log("logged out");
        dispatch(setUserLogOut());
      })
      .catch((err) => {
        setError(err.message + " Could not sign out");
        setIsPending(false);
      });
  };
  return { logout, error, isPending };
};
