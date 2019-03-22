<template>
  <transition :name="transitionName">
  <div class="slist">
    <div class="head">
      <router-link tag="i" to="/" class="iconfont icon-left"></router-link>
      <div class="searchkey">{{this.Keyword}}</div>
    </div>

    <div class="songlist">
      <ul class="songul">
        <li v-for="(item,i) in songer" :key="i">
          <img :src="item.pic">
          <span class="songname">{{item.name}}</span>
          <span class="songer">{{item.singer}}</span>
          <span class="paly" @click="topaly(item.id,item.singer,item.name,item.pic,item.lrc)">播放</span>
          <span class="time">时长:{{timeShow(item.time)}}</span>
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
import "../assets/scss/slide.css";
export default {
  created() {
    this.$axios
      .get(
        `https://vip.api.bzqll.com/music/tencent/search?key=765929048&s=${
          this.Keyword
        }&limit=50&offset=0&type=song`
      )
      .then(res => {
        res = res.data.data;
        this.songer = res;
        console.log(this.songer);
        this.shows = true;
      });
  },
  data() {
    return {
      songer: {},
      Keyword: this.$store.state.Keyword,
      shows: false,
      transitionName: "slide-right" 
    };
  },

  methods: {
    topaly(songid, singer, name, pic, lrc) {
      //传值
      this.$store.commit("receivedSongid", songid);
      this.$store.commit("receivedSongsinger", singer);
      this.$store.commit("receivedSongpic", pic);
      this.$store.commit("receivedSongname", name);
      this.$store.commit("receivedSonglrc", lrc);
      this.$router.push({ path: "/audio" });
    },
    timeShow(timeshow) {
      var secondTime = parseInt(timeshow);
      var minTime = 0;
      var hourTime = 0;

      if (secondTime > 60) {
        minTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minTime > 60) {
          hourTime = parseInt(minTime / 60);
          minTime = parseInt(minTime % 60);
        }
      }
      if (secondTime < 10) {
        secondTime = "0" + secondTime;
      }
      if (minTime < 10) {
        minTime = "0" + minTime;
      }
      if (hourTime < 10) {
        hourTime = "0" + hourTime;
      }

      return (timeshow = minTime + ":" + secondTime);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.slist{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.8s ease;
  background: white;
  height: 736px;
  z-index: 25;
}
.head {
  width: 100%;
  height: 40px;
  background: #33c27d;
  position: relative;
  i {
    position: absolute;
    font-size: 20px;
    top: 8px;
    left: 8px;
  }
  .searchkey {
    width: 100%;
    font-size: 25px;
    background: #33c27d;
    text-align: center;
    line-height: 38px;
  }
}
.songlist {
  width: 100%;
  max-height: 647px;
  overflow-y: auto;
  .songul {
    li {
      width: 100%;
      float: left;
      height: 80px;
      position: relative;
      border-bottom: 0.1px solid rgb(248, 245, 245);
      img {
        width: 80px;
        height: 80px;
        background: #33c27d;
      }
      .songname {
        width: 169px;
        position: absolute;
        top: 8px;
        left: 100px;
        font-size: 22px;
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis;
      }
      .songer {
        width: 169px;
        position: absolute;
        top: 40px;
        left: 100px;
        font-size: 17px;
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis;
      }
      .paly {
        position: absolute;
        top: 23px;
        right: 15px;
        font-size: 19px;
      }
      .time {
        position: absolute;
        top: 30px;
        right: 73px;
        font-size: 15px;
      }
    }
  }
}

</style>
