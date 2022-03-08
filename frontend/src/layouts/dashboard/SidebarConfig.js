// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'מדדים יומיים',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'נתוני לקוחות',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'לוח הזנת שיחות',
    path: '/dashboard/blog',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'אודות',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  
];

export default sidebarConfig;