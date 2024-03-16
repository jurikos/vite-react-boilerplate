import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CryptocurrencyPage, HomePage, JsonPlaceholderPage } from '@pages';

import { Layout } from '@shared/components';
import { GlobalProvider } from '@shared/context';
import { RouteDictionary } from '@shared/routes';

import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const Root = () => (
  <GlobalProvider>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />
    </QueryClientProvider>
  </GlobalProvider>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: RouteDictionary.Home,
          element: <HomePage />,
        },
        {
          path: RouteDictionary.JsonPlaceholder,
          element: <JsonPlaceholderPage />,
        },
        {
          path: RouteDictionary.Cryptocurrency,
          element: <CryptocurrencyPage />,
        },
      ],
    },
  ],
  { basename: '/vite-react-boilerplate' },
);

const App = () => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);

export default App;
