import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Spacer } from '@chakra-ui/react';

import { CryptoDetail, CryptoList } from '@modules';

import { PageHeading } from '@shared/components';

const CryptocurrencyPage = () => {
  const { currencyName } = useParams();

  if (currencyName) {
    return <DetailView currencyName={currencyName} />;
  }

  return <IndexView />;
};

export default CryptocurrencyPage;

const IndexView = () => {
  return (
    <>
      <PageHeading title="Cryptocurrency" description="Cryptocurrency." />
      <Spacer height={16} />
      <CryptoList />
    </>
  );
};

const DetailView = ({ currencyName }: { currencyName: string }) => {
  const [metaTags, setMetaTags] = useState<{ title: string; description: string }>();

  return (
    <>
      <PageHeading title={metaTags?.title} description={metaTags?.description} />
      <Spacer height={16} />
      <CryptoDetail currencyName={currencyName} onSetMetaTags={setMetaTags} />
    </>
  );
};
