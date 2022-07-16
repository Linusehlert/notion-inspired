import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
//Layout and Pages
import Layout from "./components/Layout/Layout";
import Project from "./pages/Project";
import Task from "./pages/Task";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Folder from "./pages/Folder";
import {useAuthContext} from "./hooks/useAuthContext";

function App() {
    const {user, authIsReady} = useAuthContext();
    return (
        <BrowserRouter>
            {authIsReady && (
                <Routes>
                    <Route path="/" element={user ? <Layout/> : <Navigate to="/login" replace/>}>
                        <Route path=":folderId" element={<Folder/>}>
                            <Route path=":projectId" element={<Project/>}>
                                <Route path=":taskId" element={<Task/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={!user ? <Login/> : <Navigate to="/" replace/>}/>
                    <Route path="/signup" element={!user ? <SignUp/> : <Navigate to="/" replace/>}/>
                </Routes>)}
        </BrowserRouter>

    );
}

export default App;
