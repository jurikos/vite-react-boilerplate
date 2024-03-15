import Wrapper from './Wrapper';
import queryResult, { QueryResultType } from './mocks/queryResult';
import createServer from './mocks/server';

// NB! All exports to be used in test files only!
export { Wrapper as TestWrapper, createServer as createServerMock, queryResult as queryResultMock };
export type { QueryResultType as QueryResultMockType };
