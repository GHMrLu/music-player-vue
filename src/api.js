import axios from 'axios';

axios.defaults.timeout = 5000; // 默认5s超时
axios.defaults.baseURL = 'http://localhost:3000/';

export default {
  banner() {
    return axios('banner');
  },
  playlistRec() {
    return axios('personalized');
  },
  // 获取发现页面的数据
  find() {
    return axios.all([this.banner(), this.playlistRec()])
      .then(axios.spread((banner, playlistRec) => Promise.resolve({ banner, playlistRec })));
  },
  playlistDetail(id) {
    return axios('/playlist/detail', {
      params: {
        id,
      },
    });
  },
  songsDetail(ids) {
    return axios('/song/detail', {
      params: {
        ids,
      },
    });
  },
  songsUrl(ids) {
    return axios('/song/url', {
      params: {
        id: ids,
      },
    });
  },


};
