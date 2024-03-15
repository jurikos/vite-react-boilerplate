type Routes = 'Home' | 'JsonPlaceholder';

const RouteDictionary: { [key in Routes]: string } = {
  Home: '/',
  JsonPlaceholder: 'jsonplaceholder',
};

export { RouteDictionary };
