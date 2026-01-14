import type { Post } from '../types/post';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(POSTS_URL);

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }

  const json = (await response.json()) as unknown;
  if (!Array.isArray(json)) {
    throw new Error('INVALID_RESPONSE');
  }

  return json as Post[];
}
