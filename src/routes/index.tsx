import { MdDashboardCustomize } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <MdDashboardCustomize size={22} />,
    component: Dashboard,
    exact: true,
  },
  {
    path: '/users',
    name: 'Pengguna',
    icon: <FaUsers size={22} />,
    component: Users,
  },
];

export default routes;
