import { useEffect, useState } from 'react';

import { getString, setString } from '../services/storage';

const SEARCH_TEXT_KEY = 'searchText';

export function usePersistedSearch() {
  const [searchText, setSearchText] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const saved = await getString(SEARCH_TEXT_KEY);
      if (!isMounted) return;

      if (typeof saved === 'string') {
        setSearchText(saved);
      }

      setIsHydrated(true);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    void setString(SEARCH_TEXT_KEY, searchText);
  }, [isHydrated, searchText]);

  return {
    searchText,
    setSearchText,
    isHydrated,
  };
}
