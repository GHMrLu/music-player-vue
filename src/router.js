import Vue from 'vue';
import Router from 'vue-router';

// 导入页面
import Mine from './views/Mine.vue';
import Find from './views/Find.vue';
import Video from './views/Video.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mine',
      name: '我的',
      component: Mine,
    },
    {
      path: '/find',
      name: '发现',
      component: Find,
    },
    {
      path: '/video',
      name: '视频',
      component: Video,
    },
  ],
});
