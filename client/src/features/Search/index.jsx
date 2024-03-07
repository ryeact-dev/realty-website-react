import ListingsData from './ListingsData';

export default function Search({
  onSubmitHandler,
  sidebarData,
  onChangeHandler,
  isLoading,
  listings,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) {
  return (
    <section className='flex flex-col md:flex-row mx-auto max-w-6xl'>
      <aside>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col gap-4 sticky top-16 bg-slate-200 p-6 rounded-xl'
        >
          <div className='flex flex-col gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search title or address...'
              className='border rounded-lg p-3 w-full'
              value={sidebarData.searchTerm}
              onChange={onChangeHandler}
            />
          </div>
          <label className='font-semibold'>Type:</label>
          <div className='flex flex-wrap gap-3 items-center'>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                checked={sidebarData.type === 'all'}
                onChange={onChangeHandler}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                checked={sidebarData.type === 'rent'}
                onChange={onChangeHandler}
              />
              <span>Rent</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                checked={sidebarData.type === 'sale'}
                onChange={onChangeHandler}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                checked={sidebarData.offer}
                onChange={onChangeHandler}
              />
              <span>Offer</span>
            </div>
          </div>
          <label className='font-semibold'>Aminities:</label>
          <div className='flex flex-wrap gap-3 items-center'>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                checked={sidebarData.parking}
                onChange={onChangeHandler}
              />
              <span>Parking Lot</span>
            </div>
            <div className='flex gap-1'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                checked={sidebarData.furnished}
                onChange={onChangeHandler}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3'
              onChange={onChangeHandler}
              defaultValue='createAt_desc'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </aside>
      <ListingsData
        listings={listings}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </section>
  );
}
