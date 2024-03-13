import { z } from 'zod';

import { api } from '@utils';

import { Post, schemaPost } from './types';

export const getPosts = async (endpoint: string): Promise<Post[]> => {
  try {
    const response = await api.get(endpoint).json<Post[]>();
    const fetchedPosts = await schemaPost.array().parseAsync(response);

    return fetchedPosts;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      throw new Error('Data validation failed');
    }

    if (error instanceof Error) {
      console.error('API call failed:', error.message);
      throw new Error(`API call failed: ${error.message}`);
    }

    console.error('An unknown error occurred:', error);
    throw new Error('An unknown error occurred.');
  }
};
