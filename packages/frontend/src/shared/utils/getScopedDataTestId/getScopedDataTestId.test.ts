import getScopedDataTestId from './getScopedDataTestId';

const testIdScopeMock = 'Module-Component';
const dataTestIdMock = 'isDataPresent';

describe('getScopedDataTestId', () => {
  it('should concatenate testIdScope and dataTestId with a dash', () => {
    const result = getScopedDataTestId(testIdScopeMock, dataTestIdMock);

    expect(result).toBe(`${testIdScopeMock}-${dataTestIdMock}`);
  });
});
