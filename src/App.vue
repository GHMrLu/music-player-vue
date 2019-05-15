<template>
  <div id="app" :style="{'padding-bottom':(isPlayBarDisplay?'50px':'0px')}" ref="app">
    <router-view @songListShow="songListShow"></router-view>
    <audio
      id="audio-player"
      style="display:none"
      controls="controls"
      ref="audioPlayer"
      autoplay
      :loop="isLoop"
      :src="currentSong.url"
      @loadedmetadata="loadedmetadata"
      @playing="playing"
      @pause="pause"
      @timeupdate="timeupdate"
      @ended="ended"
    />
    <play-bar class="playTabBar" v-if="isPlayBarDisplay" @songListShow="songListShow"/>
    <div class="songListWrapper" v-show="isSongListShow">
      <song-list class="song-list" @songListClose="songListClose"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PlayBar from './components/PlayBar.vue';
import SongList from './components/SongList.vue';
import playMode from './common/playMode';

export default {
  data() {
    return {
      isSongListShow: false,
    };
  },
  components: {
    PlayBar,
    SongList,
  },
  watch: {
    // eslint-disable-next-line func-names
    'currentSong.url': function (url) {
      this.$refs.audioPlayer.src = url;
    },
  },
  computed: {
    isPlayBarDisplay() {
      if (this.$route.name === '播放器') return false;
      if (JSON.stringify(this.currentSong) !== '{}') return true;
      return false;
    },
    isLoop() {
      if (this.playMode === playMode.LOOP) return true;
      return false;
    },
    ...mapState(['currentSong', 'playMode']),
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
    ended() {
      this.nextSong();
    },
    songListShow() {
      this.isSongListShow = true;
    },
    songListClose() {
      this.isSongListShow = false;
    },
    ...mapActions(['nextSong']),
  },
};
</script>


<style lang="less">
#app {
  box-sizing: border-box;
  .playTabBar-wrapper {
    height: 50px;
  }
  .playTabBar {
    position: fixed;
    bottom: 0px;
    left: 0px;
  }

  .songListWrapper {
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 2;
    .song-list {
      position: fixed;
      bottom: 0px;
      left: 0px;
    }
  }
}
</style>
