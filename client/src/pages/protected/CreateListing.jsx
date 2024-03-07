import { useUserStore } from '@/store';
import { Navigate } from 'react-router-dom';
import Listing from '@/features/Listing';

const INITIAL_VALUES = {
  imgUrls: [],
  title: '',
  description: '',
  address: '',
  type: 'rent',
  bedrooms: 1,
  bathrooms: 1,
  regularPrice: 50,
  discountPrice: 0,
  offer: false,
  parking: false,
  furnished: false,
};

export default function CreateListingPage() {
  const currentUser = useUserStore((state) => state.currentUser);

  return currentUser ? (
    <Listing currentUser={currentUser} INITIAL_VALUES={INITIAL_VALUES} />
  ) : (
    <Navigate to='/login' />
  );
}
