import getIsActive from './getIsActive';

describe('getIsActive', () => {
  it('returns true for an exact match', () => {
    expect(getIsActive('/about', '/about')).toBe(true);
  });

  it('handles trailing slashes correctly', () => {
    expect(getIsActive('/contact/', '/contact')).toBe(true);
    expect(getIsActive('/contact', '/contact/')).toBe(true);
  });

  it('returns true when pathname starts with slug', () => {
    expect(getIsActive('/blog/2021/title', '/blog')).toBe(true);
  });

  it('returns false when pathname does not start with slug', () => {
    expect(getIsActive('/about', '/contact')).toBe(false);
  });

  it('distinctly handles the root ("/") case', () => {
    expect(getIsActive('/', '/')).toBe(true);
    expect(getIsActive('/about', '/')).toBe(false);
  });

  it('returns true when slug is a root ("/") and pathname is root', () => {
    expect(getIsActive('/', '/')).toBe(true);
  });

  it('returns false when slug is a root ("/") but pathname is not', () => {
    expect(getIsActive('/anything-else', '/')).toBe(false);
  });
});
