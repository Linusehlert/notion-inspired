import {Routes, Route} from "react-router-dom";
//Layout and Pages
import Layout from "./components/Layout/Layout";
import Project from "./pages/Project";
import Task from "./pages/Task";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Folder from "./pages/Folder";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path=":folderId" element={<Folder/>}>
                    <Route path=":projectId" element={<Project/>}>
                        <Route path=":taskId" element={<Task/>}/>
                    </Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
}

export default App;
