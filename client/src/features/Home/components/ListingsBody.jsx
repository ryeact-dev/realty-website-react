import { Link } from 'react-router-dom';
import ListingCard from '@/features/Search/ListingsData/ListingCard';

export default function ListingsBody({
  loadingOfferListings,
  offerListingsData,
  loadingRentListings,
  rentListingsData,
  loadingSaletListings,
  saleListingsData,
}) {
  return (
    <section className='max-w-6xl mx-auto p-2 sm:p-3'>
      {/*  Listings Offer Section  */}
      <article className='flex flex-col gap-8'>
        <div className=''>
          <h1 className='text-3xl font-bold text-slate-600'>Recent Offers</h1>
        </div>
        {loadingOfferListings && <p>Loading listings</p>}
        {!loadingOfferListings && offerListingsData?.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {offerListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}
        {offerListingsData?.length === 4 && (
          <div className='w-full text-center'>
            <Link
              to='/search?offer=true'
              className='text-base text-blue-800 hover:underline hover:font-medium'
            >
              Show more offers
            </Link>
          </div>
        )}
      </article>

      {/*  Listings Rent Section  */}
      <article className='flex flex-col gap-8 my-16'>
        <div className=''>
          <h1 className='text-3xl font-bold text-slate-600 mb-2'>
            Recent places for rent
          </h1>
        </div>
        {loadingRentListings && <p>Loading listings</p>}
        {!loadingRentListings && rentListingsData?.length > 0 && (
          <div className='w-full flex flex-wrap justify-between gap-2'>
            {rentListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}
        {rentListingsData?.length === 4 && (
          <div className='w-full text-center'>
            <Link
              to='/search?type=rent'
              className='text-base text-blue-800 hover:underline hover:font-medium'
            >
              Show more places for rent
            </Link>
          </div>
        )}
      </article>

      {/*  Listings Sale Section  */}
      <article className='flex flex-col gap-8 my-12'>
        <div className=''>
          <h1 className='text-3xl font-bold text-slate-600'>
            Recent places for sale
          </h1>
        </div>
        {loadingSaletListings && <p>Loading listings</p>}
        {!loadingSaletListings && saleListingsData?.length > 0 && (
          <div className='flex flex-wrap gap-4'>
            {saleListingsData?.map((listing) => (
              <ListingCard singleListing={listing} key={listing._id} />
            ))}
          </div>
        )}

        {saleListingsData?.length === 4 && (
          <div className='w-full text-center'>
            <Link
              to='/search?type=sale'
              className='text-base text-blue-800 hover:underline hover:font-medium'
            >
              Show more places for sale
            </Link>
          </div>
        )}
      </article>
    </section>
  );
}
