import { JsonPlaceholderPosts } from '@modules';

import { useMetaTags } from '@hooks';

const JsonPlaceholder = () => {
  useMetaTags({
    title: 'JsonPlaceholder',
    description: 'JsonPlaceholder.',
  });

  return <JsonPlaceholderPosts />;
};

export default JsonPlaceholder;
