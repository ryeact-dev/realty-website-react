import { useState } from 'react';
import { app } from '@/firebase';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useMutation } from '@tanstack/react-query';
import { useErrorStore } from '@/store';
import ListingImages from './components/ListingImages';
import ListingInfo from './components/ListingInfo';
import { saveUserListing, updateUserListing } from '@/api/listing.api';
import { useNavigate } from 'react-router-dom';

export default function Listing({ INITIAL_VALUES, currentUser, paramsId }) {
  const navigate = useNavigate();
  const [error, setOnError] = useErrorStore((state) => [
    state.error,
    state.setOnError,
  ]);
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [isLoading, setIsLoading] = useState(false);

  const mutationFn = paramsId ? updateUserListing : saveUserListing;

  const saveListingMutation = useMutation({
    mutationFn: mutationFn,
    onError: (response) => setOnError(response.message),
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.success === false) {
        setOnError(data.message);
        return;
      }
      setOnError(null);
      navigate(`/single-listing/${data._id}`, {
        state: data,
      });
    },
  });

  // Upload image in the list
  const onImagesChangeHandler = (evt) => {
    const files = evt.target.files;
    const totalImgs = files.length + formData.imgUrls.length;

    if (totalImgs > 6) {
      setOnError('Please upload at most 6 images');
      return;
    }

    const imgUrlsArray = Array.from(files);
    setFormData({
      ...formData,
      imgUrls: [...formData.imgUrls, ...imgUrlsArray],
    });
  };

  // Remove image in the list
  const onRemoveImgHandler = (file) => {
    if (file.toString().includes('https://')) {
      const storage = getStorage(app);
      const storageRef = ref(storage, file);

      deleteObject(storageRef)
        .then(() => {
          const { imgUrls } = formData;
          const newArray = [...imgUrls.filter((photo) => photo !== file)];
          setFormData({ ...formData, imgUrls: newArray });
          console.log('File deleted successfully');
        })
        .catch((err) => {
          setOnError(err);
        });
    } else {
      const { imgUrls } = formData;
      const newArray = [...imgUrls.filter((photo) => photo !== file)];
      setFormData({ ...formData, imgUrls: newArray });
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => reject(err),
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          })
      );
    });
  };

  // Submit Data Function
  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    const { imgUrls, regularPrice, discountPrice } = formData;
    const promises = [];

    const HttpsImgs = imgUrls.filter((url) =>
      url.toString().includes('https://')
    );
    const isAllImgsAreHttps = imgUrls.every((url) =>
      url.toString().includes('https://')
    );

    if (imgUrls.length === 0 || imgUrls.length < 3) {
      setOnError('Please upload at least 3 images');
      return;
    }

    if (isAllImgsAreHttps && !paramsId) return; // Return false if there is a non-https file in the array

    if (Number(regularPrice) <= Number(discountPrice)) {
      setOnError('Discount price must be lower than regular price');
      return;
    }

    for (let i = 0; i < imgUrls.length; i++) {
      if (!imgUrls[i].toString().includes('https://'))
        promises.push(storeImage(imgUrls[i]));
    }

    try {
      setIsLoading(true);
      Promise.all(promises).then((urls) => {
        const userFormData = {
          ...formData,
          userRef: currentUser._id,
          imgUrls: [...HttpsImgs, ...urls],
        };
        saveListingMutation.mutate({ listingId: paramsId, userFormData });
      });
    } catch (err) {
      setOnError(err.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col sm:flex-row gap-4'
      >
        <section className='flex flex-col gap-4 flex-1'>
          <ListingInfo formData={formData} setFormData={setFormData} />
        </section>
        {/* Images Upload */}
        <section className='flex flex-col gap-4 flex-1'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              (min 3 and max 6 images)
            </span>
          </p>
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3'>
            <ListingImages
              formData={formData}
              setFormData={setFormData}
              onImagesChangeHandler={onImagesChangeHandler}
              onRemoveImgHandler={onRemoveImgHandler}
            />
          </div>

          <button
            type='submit'
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            disabled={isLoading}
          >
            {isLoading
              ? 'Submitting...'
              : paramsId
              ? 'Update Listing'
              : 'Create Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </section>
      </form>
    </main>
  );
}
