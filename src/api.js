import axios from 'axios';

axios.defaults.timeout = 5000; // 默认5s超时
axios.defaults.baseURL = 'http://localhost:3000/';

export default {
  banner() {
    return axios('banner');
  },
};
