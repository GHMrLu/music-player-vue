import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

// mutation types
const SET_FIND = 'SET_FIND';
const SET_PLAYLIST = 'SET_PLAYLIST';

export default new Vuex.Store({
  state: {
    currentSong: {
      url: 'http://m10.music.126.net/20190422162145/a8e24c4741c62c5c0dbfb04ff2bc82c9/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
      name: '',
      cover: '',
      artists: [],
      album: {},
    },
    palylist: {
      playType: '',
      songs: [],
    },
    banners: [],
    playlistsRec: [],
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    [SET_FIND](state, data) {
      state.banners = data.banners;
      state.playlistsRec = data.playlistsRec;
    },
    [SET_PLAYLIST](state, data) {
      state.palylist = data;
    },
  },
  actions: {
    find({ commit }) {
      api.find().then((res) => {
        console.log(res);

        const { banners } = res.banner.data;
        const playlistsRec = res.playlistRec.data.result;
        // const { banner, playListRec } = res;
        commit(SET_FIND, { banners, playlistsRec });
      });
    },
    playlist({ commit }, id) {
      api.playlistDetail(id).then((res) => {
        commit(SET_PLAYLIST, res.data);
      });
    },
  },
});
