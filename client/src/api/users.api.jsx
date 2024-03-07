const baseURL = import.meta.env.VITE_API_URL;

export async function signin(formData) {
  const res = await fetch(baseURL + '/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function signup(formData) {
  const res = await fetch(baseURL + '/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function googleAuth(formData) {
  const res = await fetch(baseURL + '/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function updateUser(formData) {
  const res = await fetch(`${baseURL}/api/user/update/${formData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`${baseURL}/api/user/delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();
  return data;
}

export async function logoutUser() {
  const res = await fetch(baseURL + '/api/auth/logout', {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export async function getUser(userId) {
  const res = await fetch(`${baseURL}/api/user/${userId}`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}
