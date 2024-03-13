import { setupServer } from 'msw/node';

const createServer = () => {
  const server = setupServer();

  return {
    serverStart: () => {
      beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
      afterEach(() => server.resetHandlers());
      afterAll(() => server.close());
    },
    server,
  };
};

export default createServer;
