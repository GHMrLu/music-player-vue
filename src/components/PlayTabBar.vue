<template>
  <div class="playTabBar">
    {{currentSong}}
    <div class="audio-controls">
      <img :src="currentSong.cover">
      <div class="music-content">
        <div class="music-name">{{currentSong.name}}</div>
        <div class="music-artists">{{currentSong.artists|artistsToShow}}</div>
      </div>
    </div>
    <audio :src="currentSong.url" controls="controls">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch('playlist', '24381616');
  },
  computed: {
    ...mapState(['currentSong']),
  },
  filters: {
    artistsToShow(artists) {
      const names = artists.map(el => el.name);
      return names.join('/');
    },
  },
};
</script>

<style lang="less" scoped>
.playTabBar {
  height: 50px;
  width: 100%;
  background-color: aqua;
}
</style>
