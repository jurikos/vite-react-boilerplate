import { useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';

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

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentURL = window.location.pathname + window.location.search;
    // Detect if we are in the GitHub Pages redirect scenario
    if (currentURL.includes('/?/')) {
      // Extract the path after the '/?/'
      const newPath = currentURL.split('/?/')[1] || '';
      // Use navigate to go to the correct path without leading slash
      navigate(newPath, { replace: true });
    }
  }, [navigate]);

  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Outlet />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="bottom-left" />
      </QueryClientProvider>
    </GlobalProvider>
  );
};

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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
