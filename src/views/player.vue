<template>
  <div class="player">
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
        <img src="../assets/random-btn.png" class="random-btn">
        <img src="../assets/up-btn.png" class="up-btn">
        <img
          src="../assets/play-btn.png"
          class="play-btn"
          @click="play"
          v-show="!currentSong.isPlay"
        >
        <img
          src="../assets/pause-btn.png"
          class="pause-btn"
          @click="pause"
          v-show="currentSong.isPlay"
        >
        <img src="../assets/next-btn.png" class="next-btn">
        <img src="../assets/playlist-btn.png" class="playlist-btn">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

export default {
  props: ['id'],
  data() {
    return {
      audioPlayer: null,
      processBarIsMove: false,
    };
  },
  mounted() {
    this.audioPlayer = document.getElementById('audio-player');
    this.currentSongDetail(this.id);
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
    ...mapState(['currentSong']),
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
    ...mapActions(['currentSongDetail']),
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
