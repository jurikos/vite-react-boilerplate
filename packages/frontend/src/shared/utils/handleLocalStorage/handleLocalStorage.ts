type Handler = <T = unknown>(action: 'get' | 'set', key: string, value?: T) => T | null;

const handleLocalStorage: Handler = (action, key, value) => {
  try {
    if (action === 'get') {
      const item = localStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return item !== null ? JSON.parse(item) : null;
    }

    if (action === 'set' && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('localStorage error:', error);
  }

  return null;
};

export default handleLocalStorage;
