import formatPrice from './formatPrice';

describe('formatPrice', () => {
  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('handles negative prices', () => {
    expect(formatPrice(-1)).toBe('-$1.00');
    expect(formatPrice(-10.99)).toBe('-$10.99');
  });

  it('formats normal prices correctly', () => {
    expect(formatPrice(1)).toBe('$1.00');
    expect(formatPrice(10.99)).toBe('$10.99');
    expect(formatPrice(73745.2906)).toBe('$73,745.29');
  });

  it('formats very small prices correctly', () => {
    expect(formatPrice(0.009)).toBe('$0.00900');
    expect(formatPrice(0.0000000099)).toBe('$0.00000000990');
  });
});
