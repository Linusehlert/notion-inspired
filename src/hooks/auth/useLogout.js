import { setUserLogOut } from "../../features/userSlice";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    setError(null);
    setIsPending(true);
    //sign user out
    signOut(auth)
      .then(() => {
        dispatch(setUserLogOut());
      })
      .catch((err) => {
        setError(err.message + " Could not sign out");
        setIsPending(false);
      });
  };
  return { logout, error, isPending };
};
