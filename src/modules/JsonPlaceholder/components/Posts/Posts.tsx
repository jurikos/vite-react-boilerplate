import { PropsWithChildren } from 'react';

import { Alert, AlertDescription, AlertIcon, AlertTitle, Heading, SkeletonText, Stack, Text } from '@chakra-ui/react';

import { DataTestId } from '@constants';

import { useGetApi } from '@hooks';

import { getPosts } from '../../api';

const endpoint = 'https://jsonplaceholder.typicode.com/posts';

const Posts = () => {
  const { data, isLoading, isError } = useGetApi(endpoint, getPosts);

  if (isError) {
    return (
      <RootWrapper dataTestId={DataTestId.isError}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
      </RootWrapper>
    );
  }

  if (isLoading || !data) {
    return (
      <RootWrapper dataTestId={DataTestId.isLoading}>
        <Stack spacing={8}>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Stack key={index}>
                <SkeletonText noOfLines={1} spacing="2" skeletonHeight="32px" />
                <SkeletonText noOfLines={2} spacing="2" skeletonHeight="12px" />
              </Stack>
            ))}
        </Stack>
      </RootWrapper>
    );
  }

  if (!data.length) {
    return (
      <RootWrapper dataTestId={DataTestId.isDataEmpty}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No posts!</AlertTitle>
          There are no posts added yet.
        </Alert>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper dataTestId={DataTestId.isDataPresent}>
      <Stack spacing={8}>
        {data.map(({ id, title, body }) => (
          <div key={id}>
            <Heading as="h2">{title}</Heading>
            <Text as="p">{body}</Text>
          </div>
        ))}
      </Stack>
    </RootWrapper>
  );
};

export default Posts;

const RootWrapper = ({ children, dataTestId }: PropsWithChildren<{ dataTestId: DataTestId }>) => (
  <div data-testid={dataTestId}>{children}</div>
);
