import { setActiveUser } from "../../features/userSlice";
//firebase
import { auth, db } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const { inviteLink } = useSelector((state) => state.invite);

  const signup = (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    // signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        // add display name to user
        updateProfile(user, { displayName })
          .then(() => {
            // create user document in firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, {
              displayName: user.displayName,
              email: user.email,
              photoUrl: user.photoURL,
              lastUrl: inviteLink ? inviteLink : "/",
            })
              .then(() => {
                dispatch(
                  setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                    userId: user.uid,
                    lastUrl: inviteLink ? inviteLink : "/",
                  })
                );
                setIsPending(false);
              })
              .catch((err) => {
                setError(err.message + " Could not create user");
                setIsPending(false);
              });
          })
          .catch((err) => {
            setError(err.message + " Could not add display name");
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message + " Could not sign up");
        setIsPending(false);
      });
  };

  const connectGoogle = async () => {
    setError(null);
    setIsPending(true);
    //google sign in
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        // create user document in firestore
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const { displayName, email, photoUrl, lastUrl } = docSnap.data();
              dispatch(
                setActiveUser({
                  userName: displayName,
                  userEmail: email,
                  userPhoto: photoUrl,
                  userId: user.uid,
                  lastUrl: inviteLink ? inviteLink : lastUrl,
                })
              );
              setIsPending(false);
            } else {
              setDoc(docRef, {
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                lastUrl: inviteLink ? inviteLink : "/",
              })
                .then(() => {
                  dispatch(
                    setActiveUser({
                      userName: user.displayName,
                      userEmail: user.email,
                      userPhoto: user.photoURL,
                      userId: user.uid,
                      lastUrl: inviteLink ? inviteLink : "/",
                    })
                  );
                  setIsPending(false);
                })
                .catch((err) => {
                  setError(err.message + " Could not create user");
                  setIsPending(false);
                });
            }
          })
          .catch((err) => {
            setError(err.message + " Could not get user");
            setIsPending(false);
          });
      })
      .catch((err) => {
        setError(err.message + " Could not sign in");
        setIsPending(false);
      });
  };
  return { connectGoogle, signup, error, isPending };
};
