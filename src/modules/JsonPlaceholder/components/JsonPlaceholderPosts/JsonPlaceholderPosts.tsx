import { Alert, AlertDescription, AlertIcon, AlertTitle, Heading, SkeletonText, Stack, Text } from '@chakra-ui/react';

import { RootWrapper } from '@shared/components';
import { DataTestId } from '@shared/constants';
import { useGetApi } from '@shared/hooks';
import { getScopedDataTestId } from '@shared/utils';

import { jsonPlaceholderPostApiValidationSchema } from '../../schemas';
import { apiEndpoint, testIdScope } from './constants';

const JsonPlaceholderPosts = () => {
  const { data, isLoading, isError } = useGetApi({
    endpoint: apiEndpoint,
    validationSchema: jsonPlaceholderPostApiValidationSchema,
  });

  if (isError) {
    return (
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isError)}>
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
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isLoading)}>
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
      <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataEmpty)}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No posts!</AlertTitle>
          There are no posts added yet.
        </Alert>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataPresent)}>
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

export default JsonPlaceholderPosts;
