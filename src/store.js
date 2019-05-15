import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import playMode from './common/playMode';
import { shuffle } from './common/util';

Vue.use(Vuex);

export const mutationTypes = {
  SET_FIND: 'SET_FIND',
  SET_SONGLIST: 'SET_SONGLIST',
  INIT_SONG: 'INIT_SONG',
  UPDATE_SONG: 'UPDATE_SONG',
  UPDATE_PLAYMODE: 'UPDATE_PLAYMODE',
};

export default new Vuex.Store({
  state: {
    currentSong: {},
    songList: [],
    songListPlay: [], // 歌曲的播放顺序
    playMode: playMode.SEQUENCE,
    banners: [],
    playlistsRec: [],
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    [mutationTypes.SET_FIND](state, data) {
      state.banners = data.banners;
      state.playlistsRec = data.playlistsRec;
    },
    [mutationTypes.INIT_SONG](state, data) {
      const currentSong = {
        isPlay: false,
        duration: 0,
        currentTime: 0,
      };
      state.currentSong = { ...currentSong, ...data };
    },
    [mutationTypes.UPDATE_SONG](state, data) {
      state.currentSong = { ...state.currentSong, ...data };
    },
    [mutationTypes.SET_SONGLIST](state, data) {
      state.songList = data;
      if (state.playMode === playMode.SEQUENCE) state.songListPlay = state.songList;
      if (state.playMode === playMode.RANDOM) state.songListPlay = shuffle(state.songList);
    },
    [mutationTypes.UPDATE_PLAYMODE](state, data) {
      state.playMode = data;
      if (state.playMode === playMode.SEQUENCE) state.songListPlay = state.songList;
      if (state.playMode === playMode.RANDOM) state.songListPlay = shuffle(state.songList);
    },
  },
  actions: {
    find({ commit }) {
      api.find().then((res) => {
        const { banners } = res.banner.data;
        const playlistsRec = res.playlistRec.data.result;
        commit(mutationTypes.SET_FIND, { banners, playlistsRec });
      });
    },
    playlist({ commit }, id) {
      api.playlistDetail(id).then((res) => {
        commit(mutationTypes.SET_PLAYLIST, res.data);
      });
    },
    playSong({
      commit, state,
    }, songId) {
      Promise.all([
        api.songsDetail(songId),
        api.songsUrl(songId)])
        .then(([songsDetail, songsUrl]) => {
          const [part1] = songsDetail.data.songs;
          const [part2] = songsUrl.data.data;
          const currentSong = { ...state.currentSong, ...part1, ...part2 };
          commit(mutationTypes.INIT_SONG, currentSong);
        });
    },
    nextSong({ dispatch, state }) {
      const { currentSong, songListPlay } = state;
      const index = songListPlay.findIndex(song => song.id === currentSong.id);
      const nextIndex = index < songListPlay.length - 1 ? index + 1 : 0;
      dispatch('playSong', songListPlay[nextIndex].id);
    },
    upSong({ dispatch, state }) {
      const { currentSong, songListPlay } = state;
      const index = songListPlay.findIndex(song => song.id === currentSong.id);
      const nextIndex = index === 0 ? songListPlay.length - 1 : index - 1;
      dispatch('playSong', songListPlay[nextIndex].id);
    },
  },
});
