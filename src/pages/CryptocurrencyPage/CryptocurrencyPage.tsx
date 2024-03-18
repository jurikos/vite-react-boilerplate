import { useParams } from 'react-router-dom';

import { Heading, Spacer } from '@chakra-ui/react';

import { CryptoList } from '@modules';

import { useMetaTags } from '@shared/hooks';

const CryptocurrencyPage = () => {
  const { currencyName } = useParams();

  if (currencyName) {
    return <DetailView currencyName={currencyName} />;
  }

  return <IndexView />;
};

export default CryptocurrencyPage;

const IndexView = () => {
  useMetaTags({
    title: 'Cryptocurrency',
    description: 'Cryptocurrency.',
  });

  return (
    <>
      <Heading as="h1" size="3xl">
        Cryptocurrency
      </Heading>
      <Spacer height={16} />
      <CryptoList />
    </>
  );
};

const DetailView = ({ currencyName }: { currencyName: string }) => {
  useMetaTags({
    title: `${currencyName}`,
    description: `${currencyName}.`,
  });

  return (
    <>
      <Heading as="h1" size="3xl">
        {currencyName}
      </Heading>
    </>
  );
};
