import { z } from 'zod';

const handleApiError = (error: unknown) => {
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
};

export default handleApiError;
