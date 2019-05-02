<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
      taps: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
};
</script>


<style>
</style>
