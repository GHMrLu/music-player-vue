<template>
  <div class="player" v-if="JSON.stringify(currentSong)!=='{}'">
    <div class="background" :style="{'background-image':`url('${currentSong.al.picUrl}')`}"></div>
    <div class="title">
      <span class="musicplayericon musicplayericon-leftarrow icon" @click="back"></span>
      <div class="text">{{currentSong.name}}</div>
    </div>
    <div class="play-panel">
      <img src="../assets/needle.png" class="needle" ref="needle">
      <div class="disk">
        <img class="album" :src="currentSong.al.picUrl">
        <img src="../assets/disk-border.png" class="disk-border">
      </div>
    </div>
    <div class="footer">
      <div class="process" id="process">
        <span class="currentTime time">{{currentSong.currentTime|durationShow}}</span>
        <div
          class="process-bar"
          ref="processBar"
          @mousedown.prevent="processBarMouseDown"
          @touchstart.prevent="processBarMouseDown"
          @mouseup.prevent="processBarMouseUp"
          @touchend.prevent="processBarMouseUp"
          @mousemove.prevent="processBarMouseMove"
          @touchmove.prevent="processBarMouseMove"
        >
          <div class="cur" :style="{width:`${percent*100}%`}" ref="processCur">
            <img src="../assets/process-dot.png" class="process-dot">
          </div>
        </div>
        <span class="totalTime time">{{currentSong.duration|durationShow}}</span>
      </div>
      <div class="control" id="controls">
        <span :class="['musicplayericon','playModeIcon',playModeIcon]" @click="playModeChange"></span>
        <span class="musicplayericon musicplayericon-shangyishou" @click="upSong"></span>
        <span
          class="musicplayericon musicplayericon-bofang-"
          @click="play"
          v-show="!currentSong.isPlay"
        ></span>
        <span
          class="musicplayericon musicplayericon-zanting"
          @click="pause"
          v-show="currentSong.isPlay"
        ></span>
        <span class="musicplayericon musicplayericon-xiayishou" @click="nextSong"></span>
        <span class="musicplayericon musicplayericon-bofangliebiaoicon" @click="songListShow"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import playMode from '../common/playMode';
import { mutationTypes } from '../store';

momentDurationFormatSetup(moment);

export default {
  data() {
    return {
      audioPlayer: null,
      processBarIsMove: false,
    };
  },
  mounted() {
    this.audioPlayer = document.getElementById('audio-player');
  },
  computed: {
    percent() {
      let percent = 0;
      if (this.currentSong.duration > 1) {
        percent = this.currentSong.currentTime / this.currentSong.duration;
      }
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;
      return percent.toFixed(2);
    },
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
    ...mapState(['currentSong', 'playMode']),
  },
  watch: {
    // eslint-disable-next-line func-names
    'currentSong.isPlay': function (isPlay) {
      if (this.$refs.needle) {
        if (isPlay) {
          this.$refs.needle.setAttribute(
            'style',
            'transform:translate(20px, -15px) rotate(0deg)',
          );
        } else {
          this.$refs.needle.setAttribute(
            'style',
            'transform:translate(20px, -15px) rotate(-30deg)',
          );
        }
      }
    },
  },
  methods: {
    play() {
      this.audioPlayer.play();
    },
    pause() {
      this.audioPlayer.pause();
    },
    back() {
      this.$router.go(-1);
    },
    processBarMouseDown(e) {
      this.processBarIsMove = true;
      const processBarWidth = this.$refs.processBar.clientWidth;
      const processBarRect = this.$refs.processBar.getBoundingClientRect();
      const startX = e.clientX || e.touches[0].clientX;
      const offset = startX - processBarRect.x;
      let percent = offset / processBarWidth;
      percent = percent < 0 ? 0 : percent;
      percent = percent > 1 ? 1 : percent;
      this.$refs.processCur.setAttribute('style', `width:${percent * 100}%`);
    },
    processBarMouseUp(e) {
      console.log(e);
      this.processBarIsMove = false;
      const processBarWidth = this.$refs.processBar.clientWidth;
      const processBarRect = this.$refs.processBar.getBoundingClientRect();
      const endX = e.clientX || e.changedTouches[0].clientX;
      const offset = endX - processBarRect.x;
      let percent = offset / processBarWidth;
      percent = percent < 0 ? 0 : percent;
      percent = percent > 1 ? 1 : percent;
      this.audioPlayer.currentTime = this.audioPlayer.duration * percent;
    },
    processBarMouseMove(e) {
      if (this.processBarIsMove) {
        const processBarWidth = this.$refs.processBar.clientWidth;
        const processBarRect = this.$refs.processBar.getBoundingClientRect();
        const startX = e.clientX || e.touches[0].clientX;
        const offset = startX - processBarRect.x;
        let percent = offset / processBarWidth;
        percent = percent < 0 ? 0 : percent;
        percent = percent > 1 ? 1 : percent;
        this.$refs.processCur.setAttribute('style', `width:${percent * 100}%`);
        //      this.audioPlayer.currentTime = this.audioPlayer.duration * percent;
      }
    },
    songListShow() {
      this.$emit('songListShow');
    },
    playModeChange() {
      const playModeKeys = Object.keys(playMode);
      const index = playModeKeys.findIndex(
        key => playMode[key] === this.playMode,
      );
      const nextIndex = index < playModeKeys.length - 1 ? index + 1 : 0;
      const newPlayMode = playMode[playModeKeys[nextIndex]];
      this.updatePlayMode(newPlayMode);
    },
    ...mapMutations({
      updatePlayMode: mutationTypes.UPDATE_PLAYMODE,
    }),
    ...mapActions(['nextSong', 'upSong']),
  },

  filters: {
    durationShow(duration) {
      return moment.duration(duration, 'seconds').format('mm:ss', {
        trim: false,
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
