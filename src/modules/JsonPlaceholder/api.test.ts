import { HttpResponse, http } from 'msw';

import { createServer } from '@test';

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
  const { serverStart, server } = createServer();
  serverStart();

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
