<template>
  <div id="app">
    <!-- <transition name="slide-fade"> -->
    <Header @getkey="akeys"/>
    <router-view
      @getrefs="getref"
      @last="last"
      @indexsssss="indexsssss"
      @next="next"
      @isshowlist="isshowlist"
      @playback="playback"
      :plays="ispalys"
    ></router-view>
    <!-- </transition> -->
    <!-- 点击搜索框下拉 -->
    <search :abc="keys"/>
    <!--抽屉侧边栏-->
    <left/>
    <!-- 新歌榜 -->
    <NewSong/>
    <!-- 专辑 -->
    <!-- <album/> -->
    <!-- 热门mv -->
    <HotMVlist/>
    <audios ref="getaudio"></audios>
  </div>
</template>
<script>
import "es6-promise/auto";
import Header from "./components/Header";
import audios from "./components/audios";
import index from "./views/index";
import left from "./components/left";
import audiolrc from "./views/audiolrc";
import NewSong from "./views/NewSong";
import album from "./views/album";
import HotMVlist from "./views/HotMVlist";
import search from "./components/search";
import SearchMVListShow from "./views/SearchMVList";
// import '../common/font_zn6qdp3q6i/iconfont.css';

export default {
  name: "App",
  components: {
    audios: audios,
    left: left,
    index: index,
    NewSong: NewSong,
    album: album,
    audiolrc: audiolrc,
    HotMVlist: HotMVlist,
    SearchMVListShow: SearchMVListShow,
    search: search,
    Header: Header
  },
  data() {
    return {
      num: 25,
      keys: [],
      ispalys: false
    };
  },
  computed: {},
  methods: {
    akeys(val) {
      this.keys.push(val);
    },
    toaudio() {
      this.$router.push({
        path: "/audio"
      });
    },
    getref(val) {
      // console.log(val);
      var c = this.$refs.getaudio.Playback();
      console.log("play", this.$refs.getaudio.ispaly);
      this.ispalys = this.$refs.getaudio.ispaly;
    },
    indexsssss(val) {
      // console.log(val);
      this.$refs.getaudio.Adjustment_time(val);
    },
    next() {
      this.$refs.getaudio.nextsong();
    },
    isshowlist() {
      this.$refs.getaudio.show_list();
    },
    last() {
      this.$refs.getaudio.lastsong();
    },
    playback() {
      console.log(this.$refs.getaudio.ispaly);
    }
  },
  watch: {
    abc: function() {
      this.sid = this.$store.state.songid;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>