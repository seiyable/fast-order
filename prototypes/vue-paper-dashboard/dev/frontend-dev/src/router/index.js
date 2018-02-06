import Vue from 'vue'
import Router from 'vue-router'
import PageTransitionParent from '@/components/pages/PageTransitionParent'
import Home from '@/components/pages/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: PageTransitionParent,
      children: [
        {path: '', name: 'home', component: Home}
      ]
    }
  ]
})
