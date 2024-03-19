import { Alert, AlertDescription, AlertIcon, AlertTitle, SkeletonText, Stack } from '@chakra-ui/react';

import { RootWrapper } from '@shared/components';
import { DataTestId } from '@shared/constants';
import { useGetApi } from '@shared/hooks';
import { getScopedDataTestId } from '@shared/utils';

import { cryptoCurrencyListApiValidationSchema } from '../../schemas';
import CryptoTable from './CryptoTable';
import { apiEndpoint, testIdScope } from './constants';

const CryptoList = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetApi({ endpoint: apiEndpoint, validationSchema: cryptoCurrencyListApiValidationSchema });
  const data = responseData?.data;

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
          <AlertTitle>No cryptocurrencies!</AlertTitle>
          There are no cryptocurrencies added yet.
        </Alert>
      </RootWrapper>
    );
  }

  return (
    <RootWrapper dataTestId={getScopedDataTestId(testIdScope, DataTestId.isDataPresent)}>
      <CryptoTable data={data} />
    </RootWrapper>
  );
};

export default CryptoList;
