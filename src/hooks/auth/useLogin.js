import { setActiveUser } from "../../features/userSlice";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const login = (email, password) => {
    setError(null);
    setIsPending(true);
    // login
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // update user document in firestore
        const docRef = doc(db, "users", user.uid);
        updateDoc(docRef, { online: true })
          .then(() => {
            // dispatch login action
            dispatch(
              setActiveUser({
                userName: user.displayName,
                userEmail: user.email,
                userPhoto: user.photoURL,
                userId: user.uid,
              })
            );
          })
          .catch((err) => {
            setError(err.message);
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { login, isPending, error };
};
