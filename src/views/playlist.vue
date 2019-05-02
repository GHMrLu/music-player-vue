<template>
  <div class="playlist">
    <div class="title">
      <div class="background" :style="{opacity:titleBackgroundOpactity}">
        <img :src="playlist.coverImgUrl">
      </div>
      <span class="musicplayericon musicplayericon-leftarrow icon"></span>
      <div class="text">{{titleText}}</div>
    </div>
    <div class="bg-wrapper-fixed" v-show="bgWrapperFixedShow">
      <div class="bg-wrapper">
        <div class="background">
          <img :src="playlist.coverImgUrl">
        </div>
        <div class="pl-info">
          <div class="info-left">
            <img :src="playlist.coverImgUrl" class="cover">
            <span class="playcount">233万</span>
          </div>
          <div class="info-right">
            <div class="name">{{playlist.name}}</div>
            <div class="creator">
              <img :src="playlist.creator.avatarUrl" class="avatar">
              <div class="nickname">{{playlist.creator.nickname}}</div>
            </div>
            <div class="description">{{playlist.description}}</div>
          </div>
        </div>
        <div class="pl-actions">
          <div class="playall">
            <div class="play-icon-wrapper">
              <span class="musicplayericon musicplayericon-play"></span>
            </div>
            <span>播放全部</span>
            <span class="trackCount">(共{{playlist.trackCount}}首)</span>
          </div>
          <div class="collect">
            <span class="musicplayericon musicplayericon-add"></span>
            收藏({{playlist.subscribedCount}})
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="scroll-content">
        <div class="bg-wrapper">
          <div class="background">
            <img :src="playlist.coverImgUrl">
          </div>
          <div class="pl-info">
            <div class="info-left">
              <img :src="playlist.coverImgUrl" class="cover">
              <span class="playcount">233万</span>
            </div>
            <div class="info-right">
              <div class="name">{{playlist.name}}</div>
              <div class="creator">
                <img :src="playlist.creator.avatarUrl" class="avatar">
                <div class="nickname">{{playlist.creator.nickname}}</div>
              </div>
              <div class="description">{{playlist.description}}</div>
            </div>
          </div>
          <div class="pl-actions">
            <div class="playall">
              <div class="play-icon-wrapper">
                <span class="musicplayericon musicplayericon-play"></span>
              </div>
              <span>播放全部</span>
              <span class="trackCount">(共{{playlist.trackCount}}首)</span>
            </div>
            <div class="collect">
              <span class="musicplayericon musicplayericon-add"></span>
              收藏({{playlist.subscribedCount}})
            </div>
          </div>
        </div>
        <div class="pl-songs">
          <div class="song" v-for="(song,index) in playlist.tracks" :key="index">
            <div class="index-wrapper">
              <div class="index">{{index+1}}</div>
            </div>
            <div class="song-info">
              <div class="name">{{song.name}}</div>
              <div class="artistsname">{{song.al.name}}-{{song.ar|artistsNameShow}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import api from '../api';

export default {
  data() {
    return {
      titleText: '歌单',
      playlist: {},
      bgWrapperFixedShow: false,
      scrollY: 0,
      titleBackgroundOpactity: 0,
    };
  },
  props: ['id'],
  mounted() {
    api.playlistDetail(this.id).then((res) => {
      this.playlist = res.data.playlist;
      this.$nextTick(() => {
        const scroll = new BScroll(this.$refs.scrollWrapper, {
          probeType: 3,
          bounce: {
            top: true,
            bottom: false,
            left: false,
            right: false,
          },
        });
        scroll.on('scroll', (pos) => {
          this.scrollY = pos.y;
        });
      });
    });
  },
  computed: {},
  watch: {
    scrollY(newScrollY) {
      this.bgWrapperFixedShow = newScrollY <= -140;

      if (newScrollY > 0) this.titleBackgroundOpactity = 0;
      if (newScrollY < 0 && newScrollY > -140) {
        this.titleBackgroundOpactity = newScrollY / -140;
      }
      if (newScrollY <= -140) this.titleBackgroundOpactity = 1;
    },
  },
  methods: {},
  filters: {
    artistsNameShow(artists) {
      const names = artists.map(el => el.name);
      return names.join('/');
    },
  },
};
</script>
