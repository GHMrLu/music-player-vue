<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <audio
      id="audio-player"
      style="display:none"
      controls="controls"
      ref="audioPlayer"
      autoplay
      :src="currentSong.url"
      @loadedmetadata="loadedmetadata"
      @playing="playing"
      @pause="pause"
      @timeupdate="timeupdate"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      transitionName: '',
      taps: [],
    };
  },
  computed: {
    ...mapState(['currentSong']),
  },
  methods: {
    loadedmetadata() {
      const currentSong = {
        isPlay: false,
        duration: this.$refs.audioPlayer.duration,
      };
      this.$store.commit('UPDATE_SONG', currentSong);
    },
    playing() {
      if (!this.currentSong.isPlay) {
        const currentSong = {
          isPlay: true,
        };
        this.$store.commit('UPDATE_SONG', currentSong);
      }
    },
    pause() {
      if (this.currentSong.isPlay) {
        const currentSong = {
          isPlay: false,
        };
        this.$store.commit('UPDATE_SONG', currentSong);
      }
    },
    timeupdate() {
      const currentSong = {
        currentTime: this.$refs.audioPlayer.currentTime,
      };
      this.$store.commit('UPDATE_SONG', currentSong);
    },
  },
  components: {},
  watch: {},
};
</script>


<style>
</style>
