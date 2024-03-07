const baseURL = import.meta.env.VITE_API_URL;

export async function saveUserListing({ userFormData }) {
  const response = await fetch(baseURL + '/api/listing/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userFormData),
  });

  const data = await response.json();
  return data;
}

export async function getUserListings({ userId }) {
  const res = await fetch(`${baseURL}/api/user/listings/${userId}`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function deleteUserListing(listingId) {
  const res = await fetch(`${baseURL}/api/listing/delete/${listingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function toggleFavorites({ listingId, toggleFavorties }) {
  const res = await fetch(`${baseURL}/api/listing/favorites/${listingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(toggleFavorties),
  });
  const data = await res.json();
  return data;
}

export async function getUserFavorites(searchQuery) {
  const res = await fetch(
    `${baseURL}/api/listing/get-favorites${searchQuery}`,
    {
      credentials: 'include',
    }
  );
  const data = await res.json();
  return data;
}

export async function updateUserListing({ listingId, userFormData }) {
  const res = await fetch(`${baseURL}/api/listing/update/${listingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userFormData),
  });
  const data = await res.json();
  return data;
}

export async function getSingleListing(listingId) {
  const res = await fetch(`${baseURL}/api/listing/single/${listingId}`);
  const data = await res.json();
  return data;
}

export async function getSearchListings(searchQuery) {
  const res = await fetch(`${baseURL}/api/listing/get-listings${searchQuery}`);
  const data = await res.json();
  return data;
}
