import { Routes, Route } from 'react-router-dom';
import ManageSubscription from './pages/ManageSubscription';
import ManageSubscriber from './pages/ManageSubscriber';
import ArtistDashboard from './pages/ArtistDashboard';
import ArtistDetail from './pages/ArtistDetail';
import AlbumDetail from './pages/AlbumDetail';
import RoleDashboard from './pages/RoleDashboard';
import CreateRole from './pages/CreateRole';
import CreateUser from './pages/CreateUser';
import CreateSong from './pages/CreateSong';
import CreateAlbum from './pages/CreateAlbum';
import EditRole from './pages/EditRole';
import EditUser from './pages/EditUser';
import EditSong from './pages/EditSong';
import EditAlbum from './pages/EditAlbum';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ArtistDashboard />}/>
            <Route path="/artists/:id" element={<ArtistDetail />} />
            <Route path="/albums/:id" element={<AlbumDetail />}/>
            <Route path="/manage/subscriptions" element={<ManageSubscription />}/>
            <Route path="/manage/subscribers" element={<ManageSubscriber />}/>
            <Route path="/roles/dashboard" element={<RoleDashboard />} />
            <Route path="/roles/new" element={<CreateRole />} />
            <Route path="/users/new" element={<CreateUser />} />
            <Route path="/songs/new" element={< CreateSong/>}/>
            <Route path="/albums/new" element={< CreateAlbum/>}/>
            <Route path="/roles/edit/:id" element={<EditRole />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/songs/edit/:id" element={< EditSong/>}/>
            <Route path="/albums/edit/:id" element={< EditAlbum/>}/>
        </Routes>
    );
};

export default App;