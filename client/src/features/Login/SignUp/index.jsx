import OAuth from '@/common/OAuth';

export default function SignUp({
  setIsLogin,
  setFormData,
  formData,
  handleSubmit,
  isLoading,
  error,
}) {
  const onLinkClickHandler = () => {
    setIsLogin(true);
  };

  const onHandleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Enter username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={onHandleChange}
          required
        />
        <input
          type='email'
          placeholder='Enter email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={onHandleChange}
          required
        />
        <input
          type='password'
          placeholder='Enter password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={onHandleChange}
          required
        />
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
        <div className='flex justify-center items-center gap-1 mt-4'>
          <p>Already have an account? </p>
          <button
            type='button'
            onClick={onLinkClickHandler}
            className='text-blue-700 cursor-pointer'
          >
            Login
          </button>
        </div>
        {error && <p className='text-red-700 text-center'>{error}</p>}
      </form>
    </>
  );
}
