import { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from '../theme';

const queryClient = new QueryClient();

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default Wrapper;
