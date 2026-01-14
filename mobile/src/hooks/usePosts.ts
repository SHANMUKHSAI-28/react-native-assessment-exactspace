import { useCallback, useEffect, useState } from 'react';

import type { Post } from '../types/post';
import { fetchPosts } from '../services/postsApi';

const DEFAULT_ERROR_MESSAGE =
  'Unable to fetch posts. Check your network connection.';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await fetchPosts();
      setPosts(result);
    } catch {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const result = await fetchPosts();
      setPosts(result);
    } catch {
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    posts,
    isLoading,
    isRefreshing,
    errorMessage,
    reload: load,
    refresh,
  };
}
