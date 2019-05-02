<template>
  <div>
    <div class="header-wrapper">
      <div class="header">
        <div class="left-menu">
          <span class="musicplayericon musicplayericon-menu"></span>
        </div>
        <router-link
          tag="div"
          v-for="(route,index) in routes"
          :key="index"
          class="title"
          :class="{active:route.name===currentRoute.name}"
          :to="route.path"
        >{{route.name}}</router-link>
        <div class="right-menu">
          <span class="musicplayericon musicplayericon-search"></span>
        </div>
      </div>
    </div>
    <div class="header-wrapper-bottom"></div>
    <!-- <transition :name="transitionName"> -->
      <router-view class="content"/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
      routes: [
        {
          name: '我的',
          path: '/index/mine',
        },
        {
          name: '发现',
          path: '/index/find',
        },
        {
          name: '视频',
          path: '/index/video',
        },
      ],
    };
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
  },
  watch: {
    $route(to, from) {
      const toIndex = this.routes.findIndex(e => to.path === e.path);
      const fromIndex = this.routes.findIndex(e => from.path === e.path);
      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  position: fixed;
  top: 0px;
  width: 100%;
  background-color: #fff;
  z-index: 1000;

  .header {
    margin: 10px;
    display: flex;
    height: 20px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 16px;
      color: #868686;
      &.active {
        font-size: 18px;
        color: #000;
      }
    }
    .left-menu,
    .right-menu {
      .musicplayericon {
        color: #000;
        font-size: 20px;
      }
    }
  }
}
.header-wrapper-bottom {
  height: 40px;
}
</style>
