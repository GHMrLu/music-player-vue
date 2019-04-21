<template>
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
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
  },
  props: {
    routes: Array,
  },
};
</script>

<style lang="less" scoped>
.left-menu,
.right-menu {
  .musicplayericon {
      color: #000;
    font-size: 20px;
  }
}

.header-wrapper {
  padding: 10px;
}
.header {
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 16px;
  color: #868686;
  &.active {
    font-size: 18px;
    color: #000;
  }
}
</style>
