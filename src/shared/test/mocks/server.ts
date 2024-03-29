import { setupServer } from 'msw/node';

const createServerMock = () => {
  const server = setupServer();

  return {
    serverStart: () => {
      beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());
    },
    server,
  };
};

export default createServerMock;
