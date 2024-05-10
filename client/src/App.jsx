import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { HomeLayout, DashboardLayout, Landing, Register, Login, Error, AllJobs, Admin, Stats, AddJob, Profile, EditJob } from './pages/index';
import { action as registerAction } from './pages/Register.jsx';
import { action as loginAction } from './pages/Login.jsx';
import { loader as dashboardLoader } from './pages/DashboardLayout.jsx';
import { action as addJobAction } from './pages/AddJob.jsx';
import { loader as allJobsLoader } from './pages/AllJobs.jsx';
import { action as editJobAction, loader as editJobLoader } from './pages/EditJob.jsx';
import { action as deleteJobAction } from './pages/DeleteJob.jsx';
import { loader as adminLoader } from './pages/Admin.jsx';
import { action as profileAction } from './pages/Profile.jsx';
import { loader as statsLoader } from './pages/Stats.jsx';
import ErrorElement from './components/ErrorElement.jsx';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction

      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [{
          index: true,
          element: <AllJobs />,
          loader: allJobsLoader
        },
        {
          path: 'stats',
          element: <Stats />,
          loader: statsLoader,
          errorElement: <ErrorElement />
        },
        {
          path: 'add-jobs',
          element: <AddJob />,
          action: addJobAction
        },
        {
          path: 'profile',
          element: <Profile />,
          action: profileAction
        },
        {
          path: 'admin',
          element: <Admin />,
          loader: adminLoader
        },
        {
          path: 'edit-job/:id',
          element: <EditJob />,
          loader: editJobLoader,
          action: editJobAction
        },
        {
          path: 'delete-job/:id',
          action: deleteJobAction
        },
        ]
      },
    ]
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queries: {
        staleTime: 1000 * 10,
      }
    }
  }

});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}