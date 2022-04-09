import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import DashboardApp from './pages/DashboardApp';
import About from './pages/About';
import AnswerCallsPage from './pages/AnswerCallsPage';
import User from './pages/User';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'answerCalls', element: <AnswerCallsPage /> },
        { path: 'about', element: <About /> }
      ]
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
      ]
    }
  ]);
}
