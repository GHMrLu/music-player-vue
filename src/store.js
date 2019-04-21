import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    banner: {},
  },
  mutations: {
    /* eslint-disable no-param-reassign */
    SET_BANNER(state, banner) {
      state.banner = banner;
    },
  },
  actions: {
    banner({
      commit,
    }) {
      api.banner().then((res) => {
        const banner = res.data.banners;
        commit('SET_BANNER', banner);
      });
    },
  },
});
