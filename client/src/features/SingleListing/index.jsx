import { useState } from 'react';
import PhotoGallery from '@/common/PhotoGallery';
import Image from '@/common/Image';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaRegWindowClose,
} from 'react-icons/fa';
import ContactLandlord from './ContactLandlord';
import { useNavigate } from 'react-router-dom';

export default function SingleListing({ listingData, currentUser }) {
  const navigate = useNavigate();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

  return (
    <>
      <section className='p-4'>
        <article className='relative max-w-4xl mx-auto mt-4'>
          <h2 className='text-2xl font-semibold text-primary sm:text-3xl'>
            {`${listingData?.title} - $${
              listingData.offer
                ? listingData.discountPrice.toLocaleString('en-US')
                : listingData.regularPrice.toLocaleString('en-US')
            }${listingData.type === 'rent' ? '/month' : ''}`}
          </h2>
          <h2 className=' text-sm text-slate-700 sm:text-lg font-medium flex gap-1 items-center'>
            <FaMapMarkerAlt className='text-green-700' size={18} />
            <p>{listingData?.address}</p>
          </h2>
          <div className='flex items-center gap-2'>
            <p className='mt-2 w-40 text-center text-white font-medium capitalize bg-red-700 rounded-md py-1 cursor-default'>
              {`For ${listingData.type}`}
            </p>
            {listingData.offer && (
              <p className='mt-2 w-40 text-center text-white font-medium capitalize bg-green-700 rounded-md py-1 cursor-default'>
                {`Save $${Number(
                  listingData.regularPrice - Number(listingData.discountPrice)
                )}`}
              </p>
            )}
          </div>
          <div className='border-b border-slate-300 my-6'></div>
          <PhotoGallery
            listingData={listingData}
            setShowAllPhotos={setShowAllPhotos}
          />
          <div className='mt-4'>
            <h3 className='text-xl font-medium'>Description</h3>
            <p className='text-slate-700'>{listingData.description}</p>
          </div>
          <div className='border-b border-slate-300 my-6'></div>
          <ul className='my-4 text-green-900 font-semibold text-base flex flex-wrap item-center gap-4 sm:gap-4'>
            <li className='flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md border-2 border-slate-300'>
              <FaBed className='text-xl' />
              {listingData.bedrooms > 1
                ? `${listingData.bedrooms} beds`
                : `${listingData.bedrooms} bed`}
            </li>
            <li className='flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md border-2 border-slate-300'>
              <FaBath className='text-xl' />
              {listingData.bathrooms > 1
                ? `${listingData.bathrooms} baths`
                : `${listingData.bathrooms} bath`}
            </li>
            <li className='flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md border-2 border-slate-300'>
              <FaParking className='text-xl' />{' '}
              {listingData.parking ? 'Parking spot' : 'No Parking'}
            </li>
            <li className='flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-md border-2 border-slate-300'>
              <FaChair className='text-lg' />
              {listingData.furnished ? 'Furnished' : 'Unfurnished'}
            </li>
          </ul>
          {!currentUser && (
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='my-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full'
            >
              Login to contact landlord
            </button>
          )}
          {currentUser &&
            listingData.userRef !== currentUser._id &&
            !contactLandlord && (
              <button
                onClick={() => setContactLandlord(true)}
                className='my-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full'
              >
                Contact Landlord
              </button>
            )}
          {contactLandlord && <ContactLandlord listingData={listingData} />}
        </article>
      </section>
      {showAllPhotos && (
        <section className='absolute top-0 inset-0 z-40 min-h-screen text-white w-full duration-500 transition ease-in'>
          <div className='grid gap-4 bg-black p-4'>
            <h2 className='text-center text-xl sm:text-3xl'>
              Photos of {listingData.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed right-4 top-20 sm:top-64 z-20 flex cursor-pointer gap-1 rounded-2xl bg-white px-4 py-2 text-black hover:bg-red-700 hover:text-white md:top-16 lg:right-[4rem] xl:right-[20rem] items-center'
            >
              <FaRegWindowClose size={20} />
              Close photos
            </button>

            {listingData.imgUrls?.length > 0 &&
              listingData.imgUrls.map((photo) => (
                <div className='mx-auto' key={photo}>
                  <Image src={photo} alt='' className='mb-4 rounded-2xl' />
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
}
