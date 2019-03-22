import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations'
Vue.use(Vuex);

// /001z2wBD0OMIEE
const state = {
  songid: '',
  Keyword: '',
  songurl: '',
  songname: '',
  songlrc: '',
  singer: '',
  songpic: '',
  songvid: '',
  isShow: false,
  songindextime: 0,
  album: '',
  indextimes: 0,
  arrlrc: [],
  showDrawer: false,
  showns: false,
  // lrcshow:false
  HotMvListShow: false,
  SearchMVListShow: false,
  searchshow: false,
  allsongarr: [],
  songlistid: 0,
  likealbumid: "",
  likealbumarr: [],
  likesong: '',
  likesongarr: [],
  likesonglsitid: "",
  likesonglistarr: [],
  songsound: 96,
  listclassid: 0,
  audioshow: true,
  songtime:0,
  timevalue:0
}
const getters = {
  getsongid: state => {
    return state.songid;
  },
  getisShow: state => {
    return state.isShow;
  },
  isShowMethod(state) {
    return state.isShow;
  }
}


const actions = {
  showSideBar({
    commit
  }) {
    commit('showBar')
  },
  hideSideBar({
    commit
  }) {
    commit('hideBar')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
