import { Heading, SkeletonText } from '@chakra-ui/react';

import { useMetaTags } from '@shared/hooks';

type Props = {
  title?: string;
  description?: string;
};

const PageHeading = ({ title = '', description = '' }: Props) => {
  useMetaTags({
    title,
    description,
  });

  if (title === '') {
    return <SkeletonText noOfLines={1} skeletonHeight="60px" />;
  }

  return (
    <Heading as="h1" size="3xl">
      {title}
    </Heading>
  );
};

export default PageHeading;
