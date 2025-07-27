import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ManageSong from './pages/ManageSong';
import ManageSubscription from './pages/ManageSubscription';
import ManageSubscriber from './pages/ManageSubscriber';
import ManageArtist from './pages/ManageArtist';
import RoleDashboard from './pages/RoleDashboard';
import CreateRole from './pages/CreateRole';
import CreateUser from './pages/CreateUser';
import EditRole from './pages/EditRole';
import EditUser from './pages/EditUser';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<Report />}/>
            <Route path="/manage/songs" element={<ManageSong />}/>
            <Route path="/manage/subscriptions" element={<ManageSubscription />}/>
            <Route path="/manage/subscribers" element={<ManageSubscriber />}/>
            <Route path="/manage/artists" element={<ManageArtist />}/>
            <Route path="/roles/dashboard" element={<RoleDashboard />} />
            <Route path="/roles/new" element={<CreateRole />} />
            <Route path="/users/new" element={<CreateUser />} />
            <Route path="/roles/edit/:id" element={<EditRole />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
    );
};

export default App;