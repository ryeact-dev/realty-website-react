import { Fragment } from 'react';
import ListingCard from './ListingCard';

export default function ListingsData({
  listings,
  isLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) {
  return (
    <article className='flex-1'>
      <div className='p-4 flex items-center flex-wrap gap-3'>
        {!isLoading && listings[0]?.foundListings.length === 0 && (
          <p className='text-xl text-slate-700'>No listing found!</p>
        )}
        {isLoading && (
          <p className='text-xl text-slate-700 text-center w-full'>
            Loading...
          </p>
        )}
        {!isLoading &&
          listings.length > 0 &&
          listings.map((list, index) => (
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
      {/* {!isLoading && listings[0]?.foundListings?.length < 3 && ( */}
      <div className='w-full flex justify-center'>
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
        ) : (
          <p className='text-slate-500'>Nothing more to load</p>
        )}
      </div>
      {/* )} */}
    </article>
  );
}
