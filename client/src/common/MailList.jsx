export default function MailList() {
  return (
    <div className='w-full mt-10 bg-green-600 text-white flex flex-col items-center gap-5 p-12 -mb-10'>
      <h1 className='text-4xl font-semibold'>Save time, save money!</h1>
      <span>Sign up and well send the best deals to you</span>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-2/6 items-center justify-center'>
        <input
          type='text'
          placeholder='Your Email...'
          className='w-full sm:w-80 h-10 p-2 border-none mx-2 rounded-md focus:outline-none text-slate-700'
        />
        <button className='h-10 bg-white text-green-700 font-semibold border-none rounded-md px-8 hover:opacity-90 w-full sm:w-1/3 text-center'>
          Subscribe
        </button>
      </div>
    </div>
  );
}
