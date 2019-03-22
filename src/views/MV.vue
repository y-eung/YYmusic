<template>
  <transition :name="transitionName">
    <div class="mvsss">
      <div class="head">
        <i @click="back" class="iconfont icon-left"></i>
      </div>
      <video :src="mv.url" class="mv" controls="controls" autoplay="autoplay"></video>
      <div class="mvbox">
        <div class="mvtext">
          <h3>{{mv.name}}</h3>
          <p class="singer">{{mv.signer}}</p>
          <p class="desc">{{mv.desc}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "../assets/scss/slide.css";
import { myMinxin } from "../mixins.js";
export default {
  created() {
    this.$axios
      .get(
        `https://vip.api.bzqll.com/music/tencent/mv?key=765929048&id=${
          this.$store.state.songvid
        }`
      )
      .then(res => {
        res = res.data;
        this.mv = res.data;
        console.log(this.mv);
      });
  },
  data() {
    return {
      nsdata: {},
      songssid: this.$store.state.songid,
      mv: {},
      mvtype: 123,
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  mixins: [myMinxin],
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.mvsss {
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
}
.mv {
  width: 414px;
}
.mvbox {
  position: relative;
  width: 100%;
  img {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
  .mvtext {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }
  h3 {
    position: absolute;
    top: 5px;
    margin-left: 5px;
    font-size: 20px;
  }
  .singer {
    position: absolute;
    top: 30px;
    left: 3px;
    font-size: 19px;
    margin-left: 5px;
    color: rgba(0, 0, 0, 0.656);
    // color: grey;
  }
  .desc {
    color: grey;
    position: absolute;
    top: 60px;
    font-size: 13px;
    left: 8px;
    width: 96%;
    height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
  }
}
</style>    


