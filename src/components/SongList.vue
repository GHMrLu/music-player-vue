<template>
  <div class="song-list">
    <div class="title">
      <div class="play-mode" @click="playModeChange">
        <span :class="['musicplayericon','playModeIcon',playModeIcon]"></span>
        <span>{{playMode|playModeDisplay}}</span>
      </div>
      <div class="close" @click="songListClose">
        <span class="musicplayericon musicplayericon-close"></span>
      </div>
    </div>
    <div class="songs">
      <div
        class="song"
        v-for="(song,index) in songList"
        :key="index"
        :style="{color:currentSong.id===song.id?'red':'#000'}"
        @click="playSong(song.id)"
      >
        <span class="musicplayericon musicplayericon-laba" v-if="currentSong.id===song.id"></span>
        {{song.name}}
        <span
          class="artists-name"
          :style="{color:currentSong.id===song.id?'red':'#000'}"
        >-{{song.ar|artistsNameShow}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import playMode from '../common/playMode';
import { mutationTypes } from '../store';

export default {
  methods: {
    playModeChange() {
      const playModeKeys = Object.keys(playMode);
      const index = playModeKeys.findIndex(
        key => playMode[key] === this.playMode,
      );
      const nextIndex = index < playModeKeys.length - 1 ? index + 1 : 0;
      const newPlayMode = playMode[playModeKeys[nextIndex]];
      this.updatePlayMode(newPlayMode);
    },
    songListClose() {
      this.$emit('songListClose');
    },
    ...mapActions(['playSong']),
    ...mapMutations({
      updatePlayMode: mutationTypes.UPDATE_PLAYMODE,
    }),
  },
  computed: {
    playModeIcon() {
      switch (this.playMode) {
        case playMode.SEQUENCE:
          return 'musicplayericon-liebiaoxunhuan';
        case playMode.LOOP:
          return 'musicplayericon-danquxunhuan';
        case playMode.RANDOM:
          return 'musicplayericon-suiji';
        default:
          return '';
      }
    },
    ...mapState(['songList', 'playMode', 'currentSong']),
  },
  filters: {
    playModeDisplay(value) {
      switch (value) {
        case playMode.SEQUENCE:
          return '顺序播放';
        case playMode.LOOP:
          return '循环播放';
        case playMode.RANDOM:
          return '随机播放';
        default:
          return '';
      }
    },
    artistsNameShow(artists) {
      const names = artists.map(el => el.name);
      return names.join('/');
    },
  },
};
</script>

<style lang="less" scoped>
@import "../styles/mixins.less";
.song-list {
  @songListHeight: 300px;
  @songTitleHeight: 40px;
  height: @songListHeight;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 17px 17px 0px 0px;
  .title {
    height: @songTitleHeight;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px 5px 10px;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    .play-mode {
      .playModeIcon {
        margin-right: 10px;
      }
    }
    .musicplayericon-close {
      font-size: 25px;
    }
  }
  .songs {
    height: @songListHeight - @songTitleHeight;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 0px 10px 0px 10px;
    .song {
      font-size: 15px;
      display: flex;
      align-items: center;
      height: 40px;
      .musicplayericon{
        margin-right: 5px;
      }
      .singline-text();
      .artists-name {
        font-size: 13px;
        color: #808080;
      }
    }
  }
}
</style>
