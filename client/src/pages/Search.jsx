import { getSearchListings } from '@/api/listing.api';
import Search from '@/features/Search';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const { search: searchParams } = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get('searchTerm') || '';
  const type = urlParams.get('type') || 'all';
  const offer = urlParams.get('offer') ? true : false;

  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm,
    type,
    offer,
    parking: false,
    furnished: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const onChangeHandler = (evt) => {
    const inputId = evt.target.id;
    const value = evt.target.value;
    const checked = evt.target.checked;

    const type = ['all', 'rent', 'sale'];
    const aminities = ['parking', 'furnished', 'offer'];

    if (type.includes(inputId)) {
      setSidebarData({ ...sidebarData, type: inputId });
    }

    if (inputId === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }

    if (aminities.includes(inputId)) {
      setSidebarData({
        ...sidebarData,
        [inputId]: checked || checked === 'true' ? true : false,
      });
    }

    if (inputId === 'sort_order') {
      const sort = value.split('_')[0] || 'createdAt';
      const order = value.split('_')[1] || 'desc';

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const {
    data: listings,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['listings-all', searchParams],
    queryFn: ({ pageParam }) =>
      getSearchListings(`${searchParams}&cursor=${pageParam}`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    select: ({ pages }) => {
      return pages;
    },
  });

  return (
    <Search
      onSubmitHandler={onSubmitHandler}
      sidebarData={sidebarData}
      onChangeHandler={onChangeHandler}
      listings={listings}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
    />
  );
}
