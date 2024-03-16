import { ZodError, z } from 'zod';

import handleApiError from './handleApiError';

describe('handleApiError', () => {
  it('should throw a validation error for ZodError instances', () => {
    const schema = z.string();
    let zodError: ZodError | null = null;

    try {
      schema.parse(42);
    } catch (error) {
      zodError = error as ZodError;
    }

    expect(zodError).not.toBeNull();
    expect(() => handleApiError(zodError)).toThrow('Data validation failed');
  });

  it('should throw an API call failed error for Error instances', () => {
    const apiError = new Error('API error');
    expect(() => handleApiError(apiError)).toThrow('API call failed: API error');
  });

  it('should throw an unknown error for other cases', () => {
    const unknownError = 'Unknown error';
    expect(() => handleApiError(unknownError)).toThrow('An unknown error occurred.');
  });
});
