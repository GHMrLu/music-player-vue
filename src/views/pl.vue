<template>
  <div class="playlist">
    <div class="header">
      <span class="musicplayericon musicplayericon-leftarrow icon"></span>
      <div class="text">{{titleText}}</div>
    </div>
    <div class="content">
        <div class="pl-info">

        </div>
        <div class="pl-actions">

        </div>
        <div class="pl-songs">

        </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      titleText: '歌单',
      contentStyle: {
        backgroundImage: 'url{}',
      },
      playlist: {},
    };
  },
  props: ['id'],
  mounted() {
    api.playlistDetail(this.id).then((res) => {
      this.playlist = res.data.playlist;
      this.$nextTick(() => {
        const songsDom = document.querySelector('.songs');
        songsDom.addEventListener('scroll', () => {
          console.log('song滚动了');
        });
      });
    });
  },
  filters: {
    artistsNameShow(artists) {
      const names = artists.map(el => el.name);
      return names.join('/');
    },
  },
};
</script>

<style>
</style>
