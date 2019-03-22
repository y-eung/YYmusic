import Vue from 'vue'
import Router from 'vue-router'
import NewSong from '../views/NewSong'
import index from '../views/index'
import audio from '../views/audiolrc'
import searchlist from '../components/searchlist'
import audios from '../components/audios'
import mv from '../views/MV'
import mvlist from '../views/HotMVlist'
import LikeSong from '../views/LikeSong.vue'
import album from '../views/album'
import searchmv from '../views/SearchMVList'
import SongTable from "../views/SongTable.vue";
import Songlist from '../views/Songlist.vue';
import classification from '../views/Songclassification.vue'
import Songclassification from '../views/Songclassification.vue'
import Login from '../views/Login.vue'
Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [{
      path: '/',
      component: index,
    },
    {
      path: '/ns',
      component: NewSong
    },
    {
      path: '/audio',
      component: audio
    },
    {
      path: '/searchlist',
      component: searchlist
    },
    {
      path: '/audios',
      component: audios
    },
    {
      path: '/MV',
      component: mv
    },
    {
      path: '/mvlist',
      component: mvlist
    },
    {
      path: '/album',
      component: album
    },
    {
      path: '/searchmv',
      component: searchmv
    },
    {
      path: '/likesong',
      component: LikeSong
    },

    {
      path: '/songlist',
      component: Songlist
    },
    {
      path: '/classification',
      component: classification,
      children: [{
        path: '/songtable',
        component: SongTable
      }, ]
    },
    {
      path: '/songclassification',
      component: Songclassification
    },
    {
      path: '/login',
      component: Login
    },

  ],

})
