import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateRole from './pages/CreateRole';
import CreateUser from './pages/CreateUser';
import EditRole from './pages/EditRole';
import EditUser from './pages/EditUser';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/roles/new" element={<CreateRole />} />
            <Route path="/users/new" element={<CreateUser />} />
            <Route path="/roles/edit/:id" element={<EditRole />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
    );
};

export default App;