import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { getToken, getLocalStorage } from '../libs/utils'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userName = getLocalStorage('userName')
  if (to.name === 'login') {
    next()
  } else {
    if (!getToken || !userName) {
      next({ name: 'login' })
    } else if (!store.state.userId) {
      try {
        const { success } = await store.dispatch('getUserInfo', { userName })
        if (success) {
          next()
        } else {
          next({ name: 'login' })
        }
      } catch (err) {
        next({ name: 'login' })
      }
    } else {
      next()
    }
  }
  return false
})

export default router;
