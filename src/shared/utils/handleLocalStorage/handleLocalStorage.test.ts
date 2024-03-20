import { vi } from 'vitest';

import handleLocalStorage from './handleLocalStorage';

const createLocalStorageMock = (): Partial<Storage> & { clear: () => void } => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    clear(): void {
      store = {};
    },
  };
};

const localStorageMock = createLocalStorageMock();
vi.stubGlobal('localStorage', localStorageMock);

describe('handleLocalStorage', () => {
  beforeEach(() => localStorageMock.clear());

  it('gets stored value or null', () => {
    handleLocalStorage('set', 'testKey', { a: 1 });
    expect(handleLocalStorage('get', 'testKey')).toEqual({ a: 1 });
    expect(handleLocalStorage('get', 'nonExistingKey')).toBeNull();
  });

  it('logs error on storage operation failure', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Test Error');

    vi.spyOn(localStorage, 'getItem').mockImplementationOnce(() => {
      throw error;
    });

    expect(handleLocalStorage('get', 'anyKey')).toBeNull();

    vi.spyOn(localStorage, 'setItem').mockImplementationOnce(() => {
      throw error;
    });

    expect(handleLocalStorage('set', 'anyKey', { some: 'value' })).toBeNull();
    expect(consoleErrorMock).toHaveBeenCalledTimes(2);
    expect(consoleErrorMock).toHaveBeenCalledWith('localStorage error:', error);

    consoleErrorMock.mockRestore();
  });
});
