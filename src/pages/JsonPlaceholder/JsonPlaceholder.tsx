import { Heading, Spacer } from '@chakra-ui/react';
import { JsonPlaceholderPosts } from '@modules';

import { useMetaTags } from '@hooks';

const JsonPlaceholder = () => {
  useMetaTags({
    title: 'JsonPlaceholder',
    description: 'JsonPlaceholder.',
  });

  return (
    <>
      <Heading as="h1" size="3xl">
        JsonPlaceholder
      </Heading>
      <Spacer height={16} />
      <JsonPlaceholderPosts />
    </>
  );
};

export default JsonPlaceholder;
