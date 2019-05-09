import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

// mutation types
const SET_FIND = 'SET_FIND';
const SET_PLAYLIST = 'SET_PLAYLIST';
const INIT_SONG = 'INIT_SONG';
const UPDATE_SONG = 'UPDATE_SONG';

export default new Vuex.Store({
  state: {
    currentSong: {},
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
    [INIT_SONG](state, data) {
      const currentSong = {
        isPlay: false,
        duration: 0,
        currentTime: 0,
      };
      state.currentSong = { ...currentSong, ...data };
    },
    [UPDATE_SONG](state, data) {
      state.currentSong = { ...state.currentSong, ...data };
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
    currentSongDetail({ commit, state }, id) {
      Promise.all([api.songsDetail(id), api.songsUrl(id)]).then(([songsDetail, songsUrl]) => {
        const [part1] = songsDetail.data.songs;
        const [part2] = songsUrl.data.data;
        const currentSong = { ...state.currentSong, ...part1, ...part2 };
        commit(INIT_SONG, currentSong);
      });
    },
  },
});
