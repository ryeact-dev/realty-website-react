import Profile from '@/features/Profile';
import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const currentUser = useUserStore((state) => state.currentUser);

  return currentUser ? (
    <Profile currentUser={currentUser} />
  ) : (
    <Navigate to='/login' />
  );
}
