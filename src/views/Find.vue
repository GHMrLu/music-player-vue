<template>
  <div id="find">
    <div class="swiper-wrap">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img :src="item.imageUrl">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

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
    };
  },
  mounted() {
    this.$store.dispatch('banner');
  },
  components: {
    swiper,
    swiperSlide,
  },
  computed: {
    banner() {
      return this.$store.state.banner;
    },
  },
};
</script>

<style lang="less" scoped>
#find {
  .swiper-wrap {
    padding: 0px 10px 10px 10px;
  }
  .swiper-container {
    border-radius: 10px;
    height: 150px;
    width: 100%;
    img {
      height: 100%;
      widows: 100%;
    }
  }
}
</style>
