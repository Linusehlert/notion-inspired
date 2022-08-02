//Layout and Pages
import Layout from "./components/Layout/Layout";
import { setActiveUser, setUserLogOut } from "./features/userSlice";
import { auth } from "./firebase/config";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Project from "./pages/Project/Project";
import { Task } from "./pages/Task";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [authReady, setAuthReady] = useState(false);
  //background for modalLink
  const location = useLocation();
  const background = location.state && location.state.background;

  //redux
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);

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
          })
        );
      } else {
        dispatch(setUserLogOut());
      }
      setAuthReady(true);
      unsub();
    });
  });
  console.log(userName);

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
            element={!userName ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!userName ? <SignUp /> : <Navigate to="/" replace />}
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
