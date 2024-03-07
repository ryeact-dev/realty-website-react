import { getUserFavorites } from '@/api/listing.api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import ListingCard from '../Search/ListingsData/ListingCard';

export default function Favorites() {
  const {
    data: userFavorites = [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['listings-favorites'],
    queryFn: ({ pageParam }) => getUserFavorites(`?cursor=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: ({ pages }) => {
      return pages;
    },
  });

  return (
    <section className='max-w-6xl mx-auto p-2 sm:p-3'>
      <h2 className='text-2xl font-bold mb-2 text-slate-600'>Favorites</h2>
      <div className='p-2 sm:p-0 flex items-center flex-wrap gap-3'>
        {!isLoading && userFavorites[0]?.foundListings.length === 0 && (
          <p className='text-lg text-slate-600 text-center w-full mt-10 '>
            No Favorites found!
          </p>
        )}
        {isLoading && (
          <p className='text-lg text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}
        {!isLoading &&
          userFavorites.length > 0 &&
          userFavorites.map((list, index) => (
            <Fragment key={index}>
              {list.foundListings.map((singleListing) => (
                <ListingCard
                  key={singleListing._id}
                  singleListing={singleListing}
                />
              ))}
            </Fragment>
          ))}
      </div>
      <div className='w-full flex justify-center mt-10'>
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <button
            hidden={!hasNextPage || isFetchingNextPage}
            type='button'
            onClick={() => fetchNextPage()}
            className='px-6 p-2 bg-green-700 rounded-lg text-white hover:opacity-95'
          >
            Load More
          </button>
        ) : null}
      </div>
    </section>
  );
}
