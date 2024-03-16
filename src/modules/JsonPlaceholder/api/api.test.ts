import { HttpResponse, http } from 'msw';

import { createServerMock } from '@shared/test';

import { postsMock } from '../mocks';
import { getPosts } from './api';

const endpointMock = 'https://rest-endpoint.example/path/to/posts';

describe('getPosts', () => {
  const { serverStart, server } = createServerMock();
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
