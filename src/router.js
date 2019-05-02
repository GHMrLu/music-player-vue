import Vue from 'vue';
import Router from 'vue-router';

// 导入页面
import Index from './views/Index.vue';
import Mine from './views/Mine.vue';
import Find from './views/Find.vue';
import Video from './views/Video.vue';
import playlist from './views/playlist.vue';
// import pl from './views/pl.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: '首页',
      component: Index,
      children: [
        {
          path: 'find',
          name: '发现',
          component: Find,
        },
        {
          path: 'mine',
          name: '我的',
          component: Mine,
        },
        {
          path: 'video',
          name: '视频',
          component: Video,
        },
      ],
    },
    {
      path: '/playlist',
      name: '歌单',
      component: playlist,
      props: route => ({ id: route.query.id }),
    },
  ],
});
