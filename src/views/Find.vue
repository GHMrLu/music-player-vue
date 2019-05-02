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
    <div class="dragonball-list">
      <div v-for="(dragonball,index) in dragonballList" :key="index" class="dragonball">
        <img :src="dragonball.icon" class="dragonball-icon">
        <div class="dragonball-name">{{dragonball.name}}</div>
      </div>
    </div>
    <div class="palylistsRec">
      <div class="header">
        <div class="title">推荐歌单</div>
        <div class="more-btn">歌单广场</div>
      </div>
      <div class="playlists">
        <div
          v-for="(playlist,index) in playlistsRec"
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: true,
        loop: true,
      },
      dragonballList: [
        /* eslint-disable global-require */
        {
          name: '每日推荐',
          icon: require('../assets/t_dragonball_icn_daily.png'),
        },
        {
          name: '歌单',
          icon: require('../assets/t_dragonball_icn_playlist.png'),
        },
        {
          name: '排行榜',
          icon: require('../assets/t_dragonball_icn_rank.png'),
        },
        {
          name: '电台',
          icon: require('../assets/t_dragonball_icn_radio.png'),
        },
        {
          name: '直播',
          icon: require('../assets/t_dragonball_icn_look.png'),
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch('find');
  },
  methods: {
    playlistsDetail(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    playlistsRec() {
      return this.$store.state.playlistsRec.slice(0, 12);
    },
    ...mapState(['banners']),
  },
};
</script>

<style lang="less" scoped>
#find {
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

  .dragonball-list {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .dragonball {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      .dragonball-icon {
        //background-color: #ff3627;
        background: linear-gradient(to right, #ff6847, #ff3f36);
        border-radius: 45px;
        height: 45px;
        width: 45px;
      }
      .dragonball-name {
        padding-top: 8px;
        color: #333333;
      }
    }
  }

  .palylistsRec {
    padding: 20px 10px 10px 10px;
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
