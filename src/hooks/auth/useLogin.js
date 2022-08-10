import { setActiveUser } from "../../features/userSlice";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
            getDoc(docRef)
              .then((doc) => {
                const { displayName, email, photoUrl, lastUrl } = doc.data();
                dispatch(
                  setActiveUser({
                    userName: displayName,
                    userEmail: email,
                    userPhoto: photoUrl,
                    userId: user.uid,
                    lastUrl: lastUrl,
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
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  };
  return { login, isPending, error };
};
