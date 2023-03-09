import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(user);
    }
  }, []);

  return user;
}
