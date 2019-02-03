import Vue from 'vue'
import Router from 'vue-router'
import Code from './views/Code.vue'
import Life from './views/Life.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'code',
      component: Code
    },
    {
      path: '/life',
      name: 'life',
      component: Life
    }
  ]
})
