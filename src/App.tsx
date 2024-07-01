import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NotFound from './components/NotFound';
import Students from './pages/Students';
import AddStudents from './pages/Students/AddStudents';
import DetailStudents from './pages/Students/DetailStudents';
import SignIn from './pages/Authentication/SignIn';
import AddUsers from './pages/Users/AddUsers';
import DetailUsers from './pages/Users/DetailUsers';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Pengguna | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <Users />
            </>
          }
        />
        <Route
          path="/students"
          element={
            <>
              <PageTitle title="Siswa | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <Students />
            </>
          }
        />
        <Route
          path="/students/add"
          element={
            <>
              <PageTitle title="Siswa | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <AddStudents />
            </>
          }
        />
        <Route
          path="/students/:id"
          element={
            <>
              <PageTitle title="Siswa | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <DetailStudents />
            </>
          }
        />

        <Route
          path="/users/add"
          element={
            <>
              <PageTitle title="Pengguna | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <AddUsers />
            </>
          }
        />
        <Route
          path="/users/:id"
          element={
            <>
              <PageTitle title="Pengguna | Dinas Pendidikan Daerah Provinsi Sulawesi Utara" />
              <DetailUsers />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route path="/" element={<SignIn />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
