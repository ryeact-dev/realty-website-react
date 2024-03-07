import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HeroSection({
  onSubmitHandler,
  onSearchChangeHandler,
  searchTerm,
}) {
  return (
    <section className={`bg-[url('/hero-bg.jpg')] bg-center bg-cover relative`}>
      {/* Hero Section */}
      <article className='backdrop-brightness-[20%] mb-16'>
        <div className='flex flex-col gap-6 md:px-3 py-28 px-2 items-center md:items-start sm:px-0 max-w-6xl mx-auto'>
          <h1 className='text-slate-100 font-bold text-4xl lg:text-5xl text-center md:text-start'>
            Discover Your Dream Home
            <br />
            <span className='text-3xl text-slate-300'>
              Where Modern Elegance Meets Timeless Comfort.
            </span>
          </h1>
          <p className='text-gray-100 text-xs sm:text-sm'>
            MERN Estate is the best place to find you next perfect place to
            live. <br />
            We have a wide range of properties for you to choose from.
          </p>
          <div>
            <Link
              to={`/search?searchTerm=`}
              className='text-xs sm:text-sm text-green-500 font-bold rounded-full border border-green-500 px-8 py-2 hover:bg-green-500 hover:text-green-100 transition-all duration-200 ease-in'
            >{`Let's Start now!`}</Link>
          </div>
        </div>
        <div className='flex justify-center'>
          <form
            onSubmit={onSubmitHandler}
            className='absolute bottom-[-25px] py-1 px-2 sm:h-12 sm:w-full max-w-4xl bg-white backdrop:rounded-md border-2 border-slate-300 flex items-center justify-between rounded-full'
          >
            <input
              type='text'
              placeholder='Search title or location here ...'
              className='bg-transparent focus:outline-none px-2 w-full'
              onChange={onSearchChangeHandler}
              value={searchTerm}
            />
            <button className='bg-slate-700 flex items-center justify-center gap-2 px-8 py-1 rounded-full text-white hover:opacity-90'>
              <FaSearch />
              <p>Search</p>
            </button>
          </form>
        </div>
      </article>
    </section>
  );
}
