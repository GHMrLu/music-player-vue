<template>
  <div id="find">
    <div class="swiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(banner, index) in banners" :key="index">
          <img :src="banner.imageUrl">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="palylistsRec">
      <div class="header">
        <div class="title">推荐歌单</div>
      </div>
      <div class="playlists">
        <div
          v-for="(playlist,index) in playlistRec"
          :key="index"
          class="playlist"
          @click="playlistsDetail(playlist.id)"
        >
          <div class="cover-wrapper">
            <img :src="playlist.picUrl">
          </div>
          <div class="name">{{playlist.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { bannerTypesUsable } from '@/common/bannerTypes';
import { mapActions } from 'vuex';
import api from '@/api';

let vm = null;
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: true,
        on: {
          click() {
            console.log(this.clickedIndex);
            vm.selectBanner(vm.banners[this.clickedIndex]);
          },
        },
      },
      banners: [],
      playlistRec: [],
    };
  },
  created() {
    vm = this;
    this.getBanner();
    this.getPlaylistRec();
  },
  mounted() {},
  methods: {
    getBanner() {
      api.banner().then((res) => {
        const banners = res.data.banners.filter(el => bannerTypesUsable.includes(el.targetType));
        this.banners = banners;
      });
    },
    getPlaylistRec() {
      api.playlistRec().then((res) => {
        this.playlistRec = res.data.result;
      });
    },
    playlistsDetail(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    selectBanner(banner) {
      if (banner.targetType === 1 || banner.targetType === 2004) {
        this.playSong(banner.targetId);
      }
      if (banner.targetType === 1e3 || banner.targetType === 2003) {
        this.$router.push(`/playlist?id=${banner.targetId}`);
      }
    },
    ...mapActions(['playSong']),
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {},
};
</script>

<style lang="less" scoped>
#find {
  height: 100%;
  overflow: auto;
  .swiper-wrap {
    padding: 10px 10px 10px 10px;
  }
  .swiper-container {
    border-radius: 10px;
    height: 130px;
    width: 100%;
    img {
      min-height: 100%;
      width: 100%;
    }
  }

  .palylistsRec {
    padding: 10px 10px 10px 10px;
    .header {
      padding: 10px 0px 10px 0px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .title {
        font-size: 22px;
        font-weight: bold;
      }
      .more-btn {
        font-size: 13px;
        color: #000;
        padding: 4px 8px;
        border-radius: 15px;
        border: #9e9c9c 1px solid;
      }
    }
    .playlists {
      display: flex;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      .playlist {
        width: 30%;
        padding: 10px 0px 10px 0px;
        .cover-wrapper {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          img {
            width: 100%;
            min-height: 100%;
            border-radius: 7px;
          }
        }
        .name {
          font-size: 13px;
          padding-top: 5px;
          word-break: break-all;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
