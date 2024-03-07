import { Link } from 'react-router-dom';

export default function ProfileForm({
  fileRef,
  currentUser,
  formData,
  uploadError,
  uploadPercentage,
  setImage,
  setFormData,
  updateUserMutation,
  logoutUserMutation,
  deleteUserMutation,
  error,
  isUpdateSuccess,
}) {
  const onImageChangeHandler = (evt) => {
    const file = evt.target.files[0];
    setImage(file);
  };

  const onInputChangeHandler = (evt) => {
    const value = evt.target.value;
    setFormData({ ...formData, [evt.target.id]: value });
  };

  const setOnDeleteUserHandler = (evt) => {
    evt.preventDefault();
    deleteUserMutation.mutate(currentUser._id);
  };
  const onLogoutUserHandler = (evt) => {
    evt.preventDefault();
    logoutUserMutation.mutate();
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const userData = {
      ...formData,
      id: currentUser._id,
    };

    updateUserMutation.mutate(userData);
  };

  return (
    <>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
        <input
          onChange={onImageChangeHandler}
          type='file'
          ref={fileRef}
          accept='image/*'
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-center'>
          {uploadError ? (
            <span className='text-red-700'>
              Error upload image (image must be less than 2mb)
            </span>
          ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${uploadPercentage}%`}</span>
          ) : uploadPercentage === 100 && !uploadError ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : null}
        </p>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          defaultValue={currentUser.username}
          onChange={onInputChangeHandler}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          defaultValue={currentUser.email}
          onChange={onInputChangeHandler}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={onInputChangeHandler}
        />
        <button
          disabled={updateUserMutation.isLoading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {updateUserMutation.isLoading ? 'Updating...' : 'Update'}
        </button>
        <Link
          to='/create-listing'
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
        >
          Create List
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={setOnDeleteUserHandler}
          className='text-red-700 cursor-pointer hover:font-medium'
        >
          Delete account
        </span>
        <span
          onClick={onLogoutUserHandler}
          className='text-red-700 cursor-pointer hover:font-medium'
        >
          Logout
        </span>
      </div>
      <p className='text-red-700 text-center mt-5'> {error ? error : ''}</p>
      <p className='text-green-700 text-center mt-5'>
        {isUpdateSuccess ? 'Profile successfully updated!' : ''}
      </p>
    </>
  );
}
