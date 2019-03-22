<template>
  <transition :name="transitionName">
    <div class="hml" v-show="this.$store.state.HotMvListShow">
      <div class="head">
        <i @click="backs" class="iconfont icon-left"></i>
        <div class="searchlogo">
          <i class="iconfont icon-chaxun"></i>
        </div>
        <input
          type="text"
          placeholder=" 搜索mv"
          class="search"
          v-model="MVsearch"
          @keyup.enter="tocode(MVsearch)"
        >
      </div>
      <div>
        <h2 class="mvtitle">热门MV {{MVsearch}}</h2>
      </div>
      <div class="mvlist">
        <ul>
          <li v-for="(item,i) in mvit" :key="i" class="mvli" @click="tomv(item.id)">
            <!-- h:112 w:200 -->
            <img :src="item.pic" alt>
            <div class="mvname">{{item.name}}</div>
            <div class="mvsinger">{{item.singer}}</div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import "../assets/scss/slide.css";
export default {
  created() {
    this.$axios
      .get(
        `https://api.bzqll.com/music/tencent/hotMvList?key=579621905&year=0&tag=0&area=0&limit=50&offset=0`
      )
      .then(res => {
        res = res.data;
        this.mvit = res.data;
        console.log(this.mvit);
      });
    this.$axios
      .get(`https://api.bzqll.com/music/tencent/mvListCategory?key=579621905`)
      .then(res => {
        res = res.data;
        this.mvtype = res.data;
        console.log(this.mvtype);
      });
  },
  data() {
    return {
      MVsearch: "",
      mvit: {},
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  methods: {
    tomv(songvid) {
      this.$store.commit("receivedSongvid", songvid);
      this.$router.push({
        path: "/mv"
      });
    },
    tocode(val) {
      this.$store.commit("receivedKeyWord", val);
      
      this.$router.push({
        path: "/searchmv"
      });
    },
    backs(){
      this.$store.commit("HotMvListShow", false);
    }
    // tomvsearch() {
    //   this.$router.push({
    //     path: "/searchlist"
    //   });
    // }
  },
  watch: {
    // $route(to, from) {
    //   let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
    //   console.log(this.$router.isBack);

    //   if (isBack) {
    //     this.transitionName = "slide-right";
    //   } else {
    //     this.transitionName = "slide-left";
    //   }
    //   this.$router.isBack = false;
    // }
    // MVsearch(MVKeyword) {
    //   this.$store.commit("receivedKeyWord", MVKeyword);
    //   console.log(this.$store.state.Keyword);
    // }
  }
};
</script>
<style lang="scss" scoped>


// .slide-left-enter,
// .slide-right-leave-active {
//   opacity: 1;
//   -webkit-transform: translate(100%, 0);
//   transform: translate(100%, 0);
//   transition: all .1s ;
// }

// .slide-left-leave-active,
// .slide-right-enter {
//   opacity: 1;
//   -webkit-transform: translate(100%, 0);
//   transition: all .1s;
//   transform: translate(100%, 0);
// }
.hml {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.8s ease;
  background: white;
  height: 736px;
  z-index: 3;
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
  .searchlogo {
    position: absolute;
    left: 115px;
    top: 1px;
    z-index: 2;
  }
  .search {
    position: absolute;
    width: 150px;
    height: 25px;
    background: #2bab69;
    border-radius: 5px;
    border: none;
    padding-left: 28px;
    outline: none;
    color: white;
    top: 8px;
    left: 120px;
  }
}
.mvtitle {
  margin: 5px;
}
.mvlist {
  width: 100%;
  height: 600px;
  overflow-y: auto;
  .mvli {
    list-style: none;
    position: relative;
    float: left;
    width: 50%;
    height: 160px;
    img {
      position: absolute;
      left: 5px;
      width: 198px;
      height: 110px;
    }
    .mvname {
      position: absolute;
      width: 198px;
      height: 30px;
      font-size: 15px;
      left: 5px;
      top: 112px;
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis;
    }
    .mvsinger {
      position: absolute;
      width: 198px;
      height: 30px;
      font-size: 13px;
      left: 5px;
      top: 130px;
      color: gray;
      overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis;
    }
  }
}
</style>
