import {Outlet} from 'react-router-dom';
//components
import Sidebar from "./Sidebar/Sidebar";

export default function Layout() {
    return (
        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    );
}