//Layout and Pages
import Layout from "./components/Layout/Layout";
import {
  setActiveUser,
  setUserLastUrl,
  setUserLogOut,
} from "./features/userSlice";
import { auth, db } from "./firebase/config";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Project from "./pages/Project/Project";
import { Task } from "./pages/Task/Task";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AcceptInvite } from "./pages/AcceptInvite";
import { setInviteLink } from "./features/inviteSlice";

function App() {
  const [authReady, setAuthReady] = useState(false);
  //background for modalLink
  const location = useLocation();
  const background = location.state && location.state.background;

  //redux
  const dispatch = useDispatch();
  const { userName, userId, lastUrl } = useSelector((state) => state.user);
  const { inviteLink } = useSelector((state) => state.invite);

  // check at page load if a user is authenticated
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged in, send the user's details to redux, store the current user in the state
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          const { displayName, email, photoUrl, lastUrl } = doc.data();
          dispatch(
            setActiveUser({
              userName: displayName,
              userEmail: email,
              userPhoto: photoUrl,
              userId: user.uid,
              lastUrl: inviteLink ? inviteLink : lastUrl,
            })
          );
          dispatch(setInviteLink(null));
          setAuthReady(true);
        });
      } else {
        dispatch(setUserLogOut());
        setAuthReady(true);
      }
      unsub();
    });
  });

  useEffect(() => {
    if (userId) {
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        setInviteLink(null);
        updateDoc(doc(db, "users", userId), {
          lastUrl: location.pathname,
        }).then(() => {
          dispatch(setUserLastUrl({ lastUrl: location.pathname }));
        });
      }
    }
  }, [location, userId, dispatch]);

  useEffect(() => {
    if (location.pathname.includes("invite")) {
      dispatch(setInviteLink(location.pathname));
    }
  }, [location, dispatch]);

  return (
    <>
      {authReady && (
        <Routes location={background || location}>
          <Route
            path="/"
            element={userName ? <Layout /> : <Navigate to="/login" replace />}
          >
            <Route path=":id" element={<Project />}>
              <Route path=":id" element={<Task />} />
            </Route>
          </Route>
          <Route path="invite/:id" element={<AcceptInvite />} />

          <Route
            path="/login"
            element={!lastUrl ? <Login /> : <Navigate to={lastUrl} replace />}
          />
          <Route
            path="/signup"
            element={!lastUrl ? <SignUp /> : <Navigate to={lastUrl} replace />}
          />
        </Routes>
      )}
      {authReady && background && (
        <Routes>
          <Route path=":id/:id" element={<Task />} />
        </Routes>
      )}
    </>
  );
}

export default App;
