import {Outlet} from 'react-router-dom';
import Dashboard from '../components/Dashboard';

export default function Project() {
    return (
        <div >
            <Dashboard/>
            <Outlet/>
        </div>
    );
}
