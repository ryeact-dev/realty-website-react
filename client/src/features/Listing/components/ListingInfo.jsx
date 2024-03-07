export default function ListingInfo({ formData, setFormData }) {
  const {
    title,
    description,
    address,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    offer,
    regularPrice,
    discountPrice,
  } = formData;

  const onChangeHandler = (evt) => {
    const { id, checked, value, type } = evt.target;

    if (id === 'sale' || id === 'rent') {
      setFormData({ ...formData, type: id });
    }

    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData({ ...formData, [id]: checked });
    }

    if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <>
      <input
        type='text'
        id='title'
        placeholder='Title'
        maxLength='62'
        minLength='10'
        required
        className='border p-3 rounded-lg'
        defaultValue={title}
        onChange={onChangeHandler}
      />
      <textarea
        type='text'
        id='description'
        placeholder='Description'
        required
        className='border p-3 rounded-lg'
        defaultValue={description}
        onChange={onChangeHandler}
      />
      <input
        type='text'
        id='address'
        placeholder='Address'
        required
        className='border p-3 rounded-lg'
        defaultValue={address}
        onChange={onChangeHandler}
      />
      <article className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='sale'
            className='w-5 cursor-pointer'
            onChange={onChangeHandler}
            checked={type === 'sale'}
          />
          <span>Sell</span>
        </div>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='rent'
            className='w-5 cursor-pointer'
            onChange={onChangeHandler}
            checked={type === 'rent'}
          />
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='parking'
            className='w-5 cursor-pointer'
            onChange={onChangeHandler}
            checked={parking}
          />
          <span>Parking Spot</span>
        </div>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='furnished'
            className='w-5 cursor-pointer'
            onChange={onChangeHandler}
            checked={furnished}
          />
          <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='offer'
            className='w-5 cursor-pointer'
            onChange={onChangeHandler}
            defaultChecked={offer}
          />
          <span>Offer</span>
        </div>
      </article>
      <article className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bedrooms'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
            onChange={onChangeHandler}
            defaultValue={bedrooms}
          />
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='bathrooms'
            min='1'
            max='10'
            required
            className='p-3 border border-gray-300 rounded-lg'
            onChange={onChangeHandler}
            defaultValue={bathrooms}
          />
          <span>Baths</span>
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='number'
            id='regularPrice'
            min='50'
            max='1000000'
            required
            className='p-3 border border-gray-300 rounded-lg'
            onChange={onChangeHandler}
            defaultValue={regularPrice}
          />
          <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>($ / month)</span>
          </div>
        </div>
        {offer && (
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='discountPrice'
              min='0'
              max='1000000'
              required
              className='p-3 border border-gray-300 rounded-lg'
              onChange={onChangeHandler}
              defaultValue={discountPrice}
            />
            <div className='flex flex-col items-center'>
              <p>Discounted Price</p>
              <span className='text-xs'>($ / month)</span>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
