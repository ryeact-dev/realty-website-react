export default function Footer() {
  return (
    <footer className='bg-slate-500'>
      <div className='w-full max-w-6xl mx-auto text-sm text-white px-4 pb-10 pt-8 '>
        <div className='flex flex-col  sm:flex-row items-start justify-between'>
          <ul className='flex flex-col gap-2 flex-1 mb-4 pb-2 w-full border-b-2 border-slate-400 sm:border-0'>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Countries
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Regions
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>Cities</li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Districts
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Airports
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>Hotels</li>
          </ul>
          <ul className='flex flex-col gap-2 flex-1 mb-4 pb-2 w-full border-b-2 border-slate-400 sm:border-0'>
            <li className='hover:font-semibold hover:cursor-pointer'>Homes </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Apartments{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Resorts{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>Villas</li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Hostels
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Guest houses
            </li>
          </ul>
          <ul className='flex flex-col gap-2 flex-1 mb-4 pb-2 w-full border-b-2 border-slate-400 sm:border-0'>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Unique places to stay{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Reviews
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Unpacked: Travel articles{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Travel communities{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Seasonal and holiday deals{' '}
            </li>
          </ul>
          <ul className='flex flex-col gap-2 flex-1 mb-4 pb-2 w-full border-b-2 border-slate-400 sm:border-0'>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Car rental{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Flight Finder
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Restaurant reservations{' '}
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Travel Agents{' '}
            </li>
          </ul>
          <ul className='flex flex-col gap-2 flex-1 mb-4 pb-2 w-full border-b-2 border-slate-400 sm:border-0'>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Curtomer Service
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Partner Help
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Careers
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Sustainability
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Press center
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Safety Resource Center
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Investor relations
            </li>
            <li className='hover:font-semibold hover:cursor-pointer'>
              Terms & conditions
            </li>
          </ul>
        </div>
      </div>
      <div className='text-center py-6 text-sm text-slate-300'>
        Copyright © 2022 #CodeRy
      </div>
    </footer>
  );
}
