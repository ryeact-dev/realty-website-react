import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/protected/Home';
import ProfilePage from '@/pages/protected/Profile';
import Layout from '@/containers/Layout';
import AboutPage from '@/pages/protected/About';
import Login from '@/pages/Login';
import CreateListingPage from '@/pages/protected/CreateListing';
import UpdateListingPage from '@/pages/protected/UpdateListing';
import SingleListingPage from '@/pages/protected/SingleListing';
import SearchPage from '@/pages/Search';
import FavoritesPage from '@/pages/protected/Favorites';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/create-listing',
        element: <CreateListingPage />,
      },
      {
        path: '/update-listing/:listingId',
        element: <UpdateListingPage />,
      },
      {
        path: '/single-listing/:listingId',
        element: <SingleListingPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
    ],
  },
]);
