import { useUserStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import SingleListing from '@/features/SingleListing';
import { getSingleListing } from '@/api/listing.api';
import { Navigate, useParams } from 'react-router-dom';

export default function SingleListingPage() {
  const { listingId } = useParams();
  const currentUser = useUserStore((state) => state.currentUser);

  const { isLoading, data: listingData } = useQuery({
    queryKey: ['single-listing', listingId],
    queryFn: () => getSingleListing(listingId),
  });

  return isLoading ? (
    <p className='text-center my-7'>Loading Data...</p>
  ) : listingData?.success === false || !listingData ? (
    <Navigate to='/' />
  ) : (
    <SingleListing listingData={listingData} currentUser={currentUser} />
  );
}
