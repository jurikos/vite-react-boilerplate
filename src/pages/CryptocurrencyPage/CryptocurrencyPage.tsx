import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Heading, SkeletonText, Spacer } from '@chakra-ui/react';

import { CryptoDetail, CryptoList } from '@modules';

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
  const [metaTags, setMetaTags] = useState<{ title: string; description: string }>();

  useMetaTags({
    title: metaTags?.title || '',
    description: metaTags?.description || '',
  });

  return (
    <>
      {metaTags ? (
        <Heading as="h1" size="3xl">
          {metaTags.title}
        </Heading>
      ) : (
        <SkeletonText noOfLines={1} skeletonHeight="60px" />
      )}
      <Spacer height={16} />
      <CryptoDetail currencyName={currencyName} onSetMetaTags={setMetaTags} />
    </>
  );
};
