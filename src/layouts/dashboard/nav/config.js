// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Tenant',
    path: '/dashboard/products',
    icon: icon('ic_user'),
  },
  {
    title: 'Devices',
    path: '/dashboard/devices',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Sensor values',
  //   path: '/dashboard/sensor-values',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'Report',
    path: '/login',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
