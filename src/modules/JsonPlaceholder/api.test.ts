import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import { getPosts } from './api';

const endpointMock = 'https://rest-endpoint.example/path/to/posts';
const postsMock = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
];

describe('fetches and returns posts successfully', () => {
  // Set up a server instance specifically for this describe block
  const server = setupServer();

  // Start server before all tests in this describe block
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

  // Close server after all tests in this describe block
  afterAll(() => server.close());

  // Reset handlers after each test in this describe block (important for test isolation)
  afterEach(() => server.resetHandlers());

  it('should fetch and return posts correctly', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.json(postsMock)));
    const fetchedPosts = await getPosts(endpointMock);

    expect(fetchedPosts).toEqual(postsMock);
  });

  it('throws a validation error for incorrect data format', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.json([{ ...postsMock[0], id: '1' }])));

    await expect(getPosts(endpointMock)).rejects.toThrow('Data validation failed');
  });

  it('handles fetch failure or API errors', async () => {
    server.use(http.get(endpointMock, () => HttpResponse.error()));

    await expect(getPosts(endpointMock)).rejects.toThrow(/^API call failed:/);
  });
});
