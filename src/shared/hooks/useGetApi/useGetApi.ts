import { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

const useGetApi = <T>(endpoint: string, getApiData: (endpoint: string) => Promise<T>, isEnabled = true) => {
  const toast = useToast();
  const { data, isLoading, isError, error } = useQuery<T>({
    queryKey: [endpoint],
    queryFn: () => getApiData(endpoint),
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
