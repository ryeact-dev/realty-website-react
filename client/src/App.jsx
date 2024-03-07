import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { router } from './setup/routes';

export default function App() {
  initializeApp();
  return <RouterProvider router={router} />;
}
