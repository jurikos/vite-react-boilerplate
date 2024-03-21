import { Spacer } from '@chakra-ui/react';

import { JsonPlaceholderPosts } from '@modules';

import { PageHeading } from '@shared/components';

const JsonPlaceholderPage = () => {
  return (
    <>
      <PageHeading title="JsonPlaceholder" description="JsonPlaceholder." />
      <Spacer height={16} />
      <JsonPlaceholderPosts />
    </>
  );
};

export default JsonPlaceholderPage;
