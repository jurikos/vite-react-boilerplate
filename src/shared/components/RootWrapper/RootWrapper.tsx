import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  dataTestId?: string;
};

const RootWrapper = ({ className, dataTestId, children }: PropsWithChildren<Props>) => (
  <div className={className} data-testid={dataTestId}>
    {children}
  </div>
);

export default RootWrapper;
