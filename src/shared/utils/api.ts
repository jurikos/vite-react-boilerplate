import ky from 'ky';

const api = ky.extend({
  retry: 1,
});

export default api;
