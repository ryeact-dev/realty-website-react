import { toggleFavorites } from '@/api/listing.api';
import Image from '@/common/Image';
import { useUserStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaBath,
  FaBed,
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ListingCard({ singleListing }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onToggleFavoritesMutation = useMutation({
    mutationFn: toggleFavorites,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`listings-${data.type}`] });
      queryClient.invalidateQueries({ queryKey: [`listings-offer`] });
      queryClient.invalidateQueries({ queryKey: [`listings-all`] });
      queryClient.invalidateQueries({ queryKey: ['listings-favorites'] });
    },
  });

  const {
    _id,
    title,
    imgUrls,
    address,
    description,
    regularPrice,
    discountPrice,
    bedrooms,
    bathrooms,
    offer,
    type,
    isFav,
    favUserRef,
  } = singleListing;

  const onViewDetailsClickHandler = () => {
    navigate(`/single-listing/${_id}`);
  };

  const onToggleFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    const toggleFavorties = {
      isFav: !isFav,
    };

    onToggleFavoritesMutation.mutate({ listingId: _id, toggleFavorties });
  };

  const offerSaves = Number(regularPrice) - Number(discountPrice);

  return (
    <article className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]'>
      <figure className='relative'>
        {offer && (
          <p className='absolute top-3 right-3 bg-green-600/80 px-4 py-1 rounded-full text-base font-meduim text-white z-[1] cursor-default'>
            ${offerSaves} off
          </p>
        )}

        <Image
          src={imgUrls[0]}
          alt='listing-cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </figure>
      <div className='flex flex-col gap-4 w-full py-2'>
        <div className='px-3'>
          <div className='flex justify-between items-center'>
            <p className='truncate text-lg font-semibold text-slate-700'>
              {title}
            </p>
            {currentUser && (
              <button
                type='button'
                onClick={onToggleFavoritesClickHandler}
                className='bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-all duration-200 ease-in'
              >
                {isFav && currentUser._id === favUserRef ? (
                  <FaHeart size={24} className='text-red-500' />
                ) : (
                  <FaRegHeart size={24} className='text-red-500' />
                )}
              </button>
            )}
          </div>
          <div className='flex items-center gap-1 text-sm my-3'>
            <FaMapMarkerAlt className='text-green-700' />
            <p className='text-slate-700 truncate w-full'>{address}</p>
          </div>
          <p className='text-slate-700 text-sm line-clamp-2'>{description}</p>
        </div>
        <div className='flex items-center gap-2 text-slate-500 font-bold text-sm px-3'>
          <p className='flex gap-2 items-center bg-slate-100 px-2 py-1 rounded-sm'>
            <FaBed size={20} />
            {bedrooms > 1 ? `${bedrooms} Beds` : '1 Bed'}
          </p>
          <p className='flex gap-2 items-center bg-slate-100 px-2 py-1 rounded-sm'>
            <FaBath size={18} />{' '}
            {bathrooms > 1 ? `${bathrooms} Baths` : '1 Bath'}
          </p>
        </div>
        <div className='border-b border-sklate-700'></div>
        <div className='flex items-center justify-between px-3 mb-2'>
          <div className='text-slate-500 font-bold text-xl '>
            <p>
              $
              {offer
                ? discountPrice.toLocaleString('en-US')
                : regularPrice.toLocaleString('en-US')}
            </p>
            <p className='text-xs -mt-1'>{type === 'rent' && 'per month'}</p>
          </div>
          <div className=''>
            <button
              type='button'
              onClick={onViewDetailsClickHandler}
              className='px-5 py-1 bg-slate-700 rounded-full text-white fond-bold hover:opacity-95'
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
