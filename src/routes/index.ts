type Routes = 'Home' | 'JsonPlaceholder' | 'Cryptocurrency';

const RouteDictionary: { [key in Routes]: string } = {
  Home: '/',
  JsonPlaceholder: 'jsonplaceholder',
  Cryptocurrency: 'cryptocurrency',
};

export { RouteDictionary };
