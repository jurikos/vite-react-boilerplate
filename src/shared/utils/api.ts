import ky from 'ky';

const api = ky.extend({
  retry: 0,
});

export default api;
