import { getUser } from '@/api/users.api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactLandlord({ listingData }) {
  const [message, setMessage] = useState('');

  const { isLoading, data } = useQuery({
    queryKey: ['landlord', listingData.userRef],
    queryFn: () => getUser(listingData.userRef),
  });

  const onTextareaChangeHandler = (evt) => {
    const values = evt.target.value;
    setMessage(values);
  };

  return isLoading ? (
    <p>Loading Data...</p>
  ) : data ? (
    <article>
      <p>
        Contact <span className='font-semibold'>{data.username}</span> for{' '}
        <span className='lowercase font-semibold'>{listingData.title}</span>
      </p>
      <textarea
        name='message'
        id='message'
        rows='3'
        className='w-full p-2 mb-2'
        placeholder='Write your message...'
        onChange={onTextareaChangeHandler}
      ></textarea>
      <Link
        to={`mailto:${data.email}?subject=Regarding ${listingData.title}&body=${message}`}
      >
        <p className='bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95'>
          Send message
        </p>
      </Link>
    </article>
  ) : (
    <p>Error loading landlord</p>
  );
}
