import { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { api, handleApiError } from '@shared/utils';

const getApiData = async <T>(endpoint: string, validationSchema: z.ZodSchema<T>): Promise<T> => {
  try {
    const response = await api.get(endpoint).json();

    return validationSchema.parse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

type Props<T> = {
  endpoint: string;
  validationSchema: z.ZodSchema<T>;
  isEnabled?: boolean;
};

const useGetApi = <T>({ endpoint, validationSchema, isEnabled = true }: Props<T>) => {
  const toast = useToast();
  const { data, isLoading, isError, error } = useQuery<T>({
    queryKey: [endpoint],
    queryFn: () => getApiData(endpoint, validationSchema),
    enabled: isEnabled,
  });

  useEffect(() => {
    if (!isError || !(error instanceof Error)) {
      return;
    }

    toast({
      title: 'Error!',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  }, [isError, error, toast]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useGetApi;
