import { useEffect, useState } from 'react';

import { getString, setString } from '../services/storage';

const SEARCH_TEXT_KEY = 'searchText';
const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

export function usePersistedSearch() {
  const [searchText, setSearchText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const saved = await getString(SEARCH_TEXT_KEY);
      const savedHistory = await getString(SEARCH_HISTORY_KEY);
      if (!isMounted) return;

      if (typeof saved === 'string') {
        setSearchText(saved);
      }

      if (typeof savedHistory === 'string') {
        try {
          const parsed = JSON.parse(savedHistory) as unknown;
          if (Array.isArray(parsed)) {
            setHistory(parsed.filter((x) => typeof x === 'string'));
          }
        } catch {
          // ignore invalid history
        }
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

  useEffect(() => {
    if (!isHydrated) return;
    void setString(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }, [history, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const query = searchText.trim();
    if (!query) return;

    const timer = setTimeout(() => {
      setHistory((current) => {
        const normalized = query.toLowerCase();
        const withoutDuplicate = current.filter(
          (item) => item.toLowerCase() !== normalized,
        );
        return [query, ...withoutDuplicate].slice(0, MAX_HISTORY_ITEMS);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [isHydrated, searchText]);

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    searchText,
    setSearchText,
    history,
    clearHistory,
    isHydrated,
  };
}
