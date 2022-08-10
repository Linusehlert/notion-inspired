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
import { doc, updateDoc } from "firebase/firestore";

function App() {
  const [authReady, setAuthReady] = useState(false);
  //background for modalLink
  const location = useLocation();
  const background = location.state && location.state.background;

  //redux
  const dispatch = useDispatch();
  const { userName, userId, lastUrl } = useSelector((state) => state.user);

  // check at page load if a user is authenticated
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          setActiveUser({
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
            userId: user.uid,
            lastUrl: location.pathname,
          })
        );
      } else {
        dispatch(setUserLogOut());
      }
      setAuthReady(true);
      unsub();
    });
  });

  useEffect(() => {
    if (userId) {
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        updateDoc(doc(db, "users", userId), {
          lastUrl: location.pathname,
        }).then(() => {
          dispatch(setUserLastUrl({ lastUrl: location.pathname }));
        });
      }
    }
  }, [location, userId, dispatch]);

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
            {/*<Route path="id" element={<Task />} />*/}
          </Route>
          <Route
            path="/login"
            element={!userName ? <Login /> : <Navigate to={lastUrl} replace />}
          />
          <Route
            path="/signup"
            element={!userName ? <SignUp /> : <Navigate to={lastUrl} replace />}
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
