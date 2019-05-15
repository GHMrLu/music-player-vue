<template>
  <div class="index">
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
          name: '发现',
          path: '/index/find',
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
.index {
  height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
  .header-wrapper {
    position: fixed;
    top: 0px;
    width: 100%;
    background-color: #d44439;
    color: #fff;
    z-index: 1000;

    .header {
      margin: 10px;
      display: flex;
      height: 20px;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 16px;
        color: #fff;
        &.active {
          font-size: 18px;
          color: #fff;
        }
      }
      .left-menu,
      .right-menu {
        .musicplayericon {
          color: #fff;
          font-size: 20px;
          display: none;
        }
      }
    }
  }
  .header-wrapper-bottom {
    height: 40px;
  }
}
</style>
