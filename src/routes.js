import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DevicesListTable from './pages/DevicesListTable/DevicesListTable';
import UserListTable from './pages/UserListTable/UserListTable';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ManagerListTable from './pages/ManagerListTable/ManagerListTable';
import DashboardAppPage from './pages/DashboardAppPage';
import AddDevice from './pages/AddDevice/AddDeviceForm';
import SensorValuePage from './pages/SensorValue/SensorValuePage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserListTable /> },
        { path: 'products', element: <ManagerListTable /> },
        { path: 'devices', element: <DevicesListTable /> },
        { path: 'add-device', element: <AddDevice /> },
      ],
    },
    {path: 'sensor-value/:device_id', element: <SensorValuePage/>},
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
