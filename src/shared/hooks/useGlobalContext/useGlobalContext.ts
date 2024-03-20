import { useContext } from 'react';

import { GlobalContext } from '@shared/context';

const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context.isContextProvided) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};

export default useGlobalContext;
