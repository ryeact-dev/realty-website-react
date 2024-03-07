import { getSearchListings } from '@/api/listing.api';
import MailList from '@/common/MailList';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import ListingsBody from './components/ListingsBody';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onSearchChangeHandler = (evt) => {
    const value = evt.target.value;
    setSearchTerm(value);
  };

  const { isLoading: loadingOfferListings, data: offerListingsData } = useQuery(
    {
      queryKey: ['listings-offer'],
      queryFn: () => getSearchListings('?offer=true&limit=4'),
      select: ({ foundListings }) => {
        return foundListings;
      },
    }
  );

  const { isLoading: loadingRentListings, data: rentListingsData } = useQuery({
    queryKey: ['listings-rent'],
    queryFn: () => getSearchListings('?type=rent&limit=4'),
    select: ({ foundListings }) => {
      return foundListings;
    },
    enabled: !!offerListingsData,
  });

  const { isLoading: loadingSaleListings, data: saleListingsData } = useQuery({
    queryKey: ['listings-sale'],
    queryFn: () => getSearchListings('?type=sale&limit=4'),
    select: ({ foundListings }) => {
      return foundListings;
    },
    enabled: !!rentListingsData,
  });

  return (
    <>
      <HeroSection
        onSubmitHandler={onSubmitHandler}
        onSearchChangeHandler={onSearchChangeHandler}
        searchTerm={searchTerm}
      />
      <ListingsBody
        loadingOfferListings={loadingOfferListings}
        offerListingsData={offerListingsData}
        loadingRentListings={loadingRentListings}
        rentListingsData={rentListingsData}
        loadingSaleListings={loadingSaleListings}
        saleListingsData={saleListingsData}
      />
      <MailList />
    </>
  );
}
