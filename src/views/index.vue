<template>
  <div id="index" class="index">
    <Banner></Banner>
    <Tab></Tab>
    <User></User>
    <DIYSongList/>
  </div>
</template>
<script>
import "../common/music-ioc/iconfont.css";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Tab from "../components/Tab";
import User from "../components/User";
import DIYSongList from "../components/DIYSongList";

import NewSong from "./NewSong";
export default {
  data() {
    return {
      word: ""
    };
  },
  methods: {
    keys(val) {
      this.word = val;
    }
  },
  components: {
    Header,
    Banner,
    Tab,
    User,
    NewSong,
    DIYSongList
  }
};
</script>
<style lang="scss" scoped>
// .index {
//   position: relative;

// }
</style>

