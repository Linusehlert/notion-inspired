import {Outlet} from "react-router-dom";

export default function Folder() {
    return (
        <div className="bg-primary">
            Folder
            <Outlet/>
        </div>
    );
}