<template>
  <div class="playTabBar">
    <img :src="currentSong.al.picUrl" class="cover" @click="goToPlayer">
    <div class="info" @click="goToPlayer">
      <div class="name">{{currentSong.name}}</div>
      <div class="artists">{{currentSong.ar|artistsToShow}}</div>
    </div>
    <img src="../assets/play-btn.png" class="icon" @click="play" v-show="!currentSong.isPlay">
    <img src="../assets/pause-btn.png" class="icon" @click="pause" v-show="currentSong.isPlay">
    <img src="../assets/playlist-btn.png" class="icon" @click="songListShow">
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      audioPlayer: null,
    };
  },
  mounted() {
    this.audioPlayer = document.getElementById('audio-player');
  },
  computed: {
    ...mapState(['currentSong']),
  },
  methods: {
    play() {
      this.audioPlayer.play();
    },
    pause() {
      this.audioPlayer.pause();
    },
    playlistClick() {
      this.$refs.songList.setAttribute('style', 'display:block');
    },
    goToPlayer() {
      this.$router.push('/player');
    },
    songListShow() {
      this.$emit('songListShow');
    },
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
@import "../styles/mixins.less";
.playTabBar {
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cover {
    width: 40px;
    border-radius: 50%;
  }
  .info {
    padding: 5px 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: calc(100% - 120px);
    .name {
      font-size: 15px;
      .singline-text();
    }
    .artists {
      font-size: 12px;
      .singline-text();
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    filter: brightness(0);
  }
}
</style>
