import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUserListing, getUserListings } from '@/api/listing.api';
import Image from '@/common/Image';
import { FaTrash } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';

export default function ShowListings({ currentUser, setOnError }) {
  const [showListings, setShowListings] = useState(false);
  const [fetchListings, setFetchListings] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    data = [],
    isError,
    error: fetchedError,
  } = useQuery({
    queryKey: ['userListings', currentUser],
    queryFn: () => getUserListings({ userId: currentUser._id }),
    enabled: !!fetchListings,
  });

  const onDeleteListingMutation = useMutation({
    mutationFn: deleteUserListing,
    onError: (response) => setOnError(response.message),
    onSuccess: (data) => {
      if (data.success === false) {
        setOnError(data.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['userListings'] });
      console.log('Listing succesfully removed!');
    },
  });

  const onShowListingsHandler = () => {
    setShowListings(!showListings);
    setFetchListings(true);
  };

  const onDeleteListingHandler = (listingId) => {
    onDeleteListingMutation.mutate(listingId);
  };

  const onEditListingHandler = (listingData) => {
    navigate(`/update-listing/${listingData._id}`, {
      state: listingData,
    });
  };

  return (
    <article className='w-full'>
      <div className='flex justify-center'>
        <button className='text-green-700' onClick={onShowListingsHandler}>
          Show listings
        </button>
        {isError && <p className='text-red-700'>{fetchedError}</p>}
      </div>
      {showListings && (
        <>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {!isLoading &&
            data.length > 0 &&
            data.map((listing) => (
              <div
                key={listing._id}
                className='flex justify-between gap-2 items-center border-2 rounded-lg my-2 p-4'
              >
                <Link
                  to={`/single-listing/${listing._id}`}
                  className='capitalize flex justify-start gap-4 hover:text-green-700'
                >
                  <Image
                    src={listing.imgUrls[0]}
                    alt='listing-cover'
                    className='h-28 w-28 object-cover object-center rounded-md'
                  />
                  <div className='font-medium w-48'>
                    <p className=''>{listing.title}</p>
                    <p className='font-normal text-xs opacity-80 text-slate-700 leading-5'>
                      {listing.description.slice(0, 100)}...
                    </p>
                  </div>
                </Link>

                <div className='space-y-2'>
                  <button
                    type='button'
                    onClick={() => onEditListingHandler(listing)}
                    className='bg-green-700 w-full px-4 py-1 rounded-md text-white hover:opacity-90 flex items-center justify-center gap-1'
                  >
                    <FaPenToSquare size={14} />
                    <p className='text-base uppercase font-medium'>Edit</p>
                  </button>
                  <button
                    type='button'
                    onClick={() => onDeleteListingHandler(listing._id)}
                    className='bg-red-700 px-4 py-1 rounded-md text-white hover:opacity-90 flex items-center gap-1'
                  >
                    <FaTrash size={14} className='' />
                    <p className='text-base uppercase font-medium'>Delete</p>
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </article>
  );
}
