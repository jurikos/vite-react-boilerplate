import { UseQueryResult } from '@tanstack/react-query';

export type QueryResultType = Pick<UseQueryResult, 'data' | 'isLoading' | 'isError' | 'error'>;

const queryResult: QueryResultType = {
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
};

export default queryResult;
