module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react', '<THIRD_PARTY_MODULES>', '^@pages', '^@modules', '^@shared', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
