import { api, handleApiError } from '@shared/utils';

import { Post, schemaPost } from '../types';

export const getPosts = async (endpoint: string): Promise<Post[]> => {
  try {
    const response = await api.get(endpoint).json<Post[]>();

    const fetchedPosts = schemaPost.array().parse(response);

    return fetchedPosts;
  } catch (error) {
    return handleApiError(error);
  }
};
