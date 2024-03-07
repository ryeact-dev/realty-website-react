import { Link, NavLink } from 'react-router-dom';
import { useUserStore } from '@/store';

export default function Header() {
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <header className='bg-slate-200 shadow-md top-0 sticky z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Logo */}
        <Link to='/' className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>DREAM</span>
          <span className='text-slate-700'>Estate</span>
        </Link>
        {/* Search Input */}

        {/* Nav Links */}
        <ul className='flex gap-4'>
          <NavLink to={`/`}>
            <li className=' text-slate-700 hover:cursor-pointer'>Home</li>
          </NavLink>
          <NavLink to={`/about`}>
            <li className=' text-slate-700 hover:cursor-pointer'>About</li>
          </NavLink>
          {currentUser && (
            <NavLink to={`/favorites`}>
              <li className=' text-slate-700 hover:cursor-pointer'>
                Favorties
              </li>
            </NavLink>
          )}
          <NavLink to={currentUser ? `/profile` : `/login`}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt='profile'
                className='rounded-full h-7 w-7 object-cover'
              />
            ) : (
              <li className='text-slate-700 hover:cursor-pointer'>Login</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
