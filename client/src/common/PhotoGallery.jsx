import { FaRegImages } from 'react-icons/fa';
import Image from './Image';

export default function PhotoGallery({ listingData, setShowAllPhotos }) {
  return (
    <>
      <div className='sm:grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-2xl'>
        {listingData?.imgUrls?.[0] && (
          <div className='relative'>
            <Image
              onClick={() => setShowAllPhotos(true)}
              className='relative w-full h-full cursor-pointer object-cover object-center'
              src={listingData.imgUrls[0]}
              alt=''
            />
            <button
              onClick={() => setShowAllPhotos(true)}
              className='absolute bottom-2 left-2 flex gap-1 rounded-2xl bg-white px-4 py-2 shadow-md shadow-gray-500 sm:bottom-4 sm:left-8 sm:px-6 sm:text-xl hover:bg-red-700 hover:text-white'
            >
              <FaRegImages size={24} />
              Show more photos
            </button>
          </div>
        )}
        <div className='hidden sm:grid'>
          {listingData?.imgUrls?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className='relative w-full h-full cursor-pointer object-cover object-center'
              src={listingData.imgUrls[1]}
              alt=''
            />
          )}
          <div className='overflow-hidden'>
            {listingData?.imgUrls?.[2] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className='relative top-2  w-full h-full cursor-pointer object-cover object-center'
                src={listingData.imgUrls[2]}
                alt=''
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
