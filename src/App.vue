<template>
  <div id="app">
    <!-- {{router}} -->
    <music-header :routes="routes"/>
    <transition :name="transitionName">
      <router-view class="content"/>
    </transition>
  </div>
</template>

<script>
import MusicHeader from './components/MusicHeader.vue';

export default {
  data() {
    return {
      transitionName: '',
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  components: {
    MusicHeader,
  },
  watch: {
    $route(to, from) {
      const toIndex = this.routes.findIndex(e => to.path === e.path);
      const fromIndex = this.routes.findIndex(e => from.path === e.path);
      this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left';
      console.log(this.$router.options.routes);
    },
  },
};
</script>


<style lang="less">
body {
  padding: 0px;
  margin: 0px;
}

.content {
  width: 100%;
  position: absolute;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s ease;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-100%);
}
</style>
