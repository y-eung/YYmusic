<template>
  <transition :name="transitionName">
    <div class="smvl">
      <div class="head">
        <router-link tag="i" to="/" class="iconfont icon-left"></router-link>
        <div class="searchlogo">
          <!-- <i class="iconfont icon-suosou"></i> -->
          有关`{{this.$store.state.Keyword}}`的MV
        </div>
      </div>
      <div class="mvlist">
        <ul>
          <li v-for="(item,i) in mvit" :key="i" class="mvli" @click="tomv(item.v_id)">
            <img :src="item.mv_pic_url" alt>
            <div class="mvname">{{item.mvName_hilight}}</div>
            <div class="mvsinger">{{item.singer_name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
// `https://api.bzqll.com/music/tencent/search?key=579621905&s=张国荣&limit=10&offset=0&type=mv`
/*      
`https://api.bzqll.com/music/tencent/search?key=579621905&s=${
          this.$store.state.Keyword
        }&limit=10&offset=0&type=mv` 
*/
import { myMinxin } from "../mixins.js";
export default {
  mixins: [myMinxin],
  created() {
    this.$axios
      .get(
        `https://api.bzqll.com/music/tencent/search?key=579621905&s=${
          this.$store.state.Keyword
        }&limit=10&offset=0&type=mv`
      )
      .then(res => {
        res = res.data;
        this.mvit = res.data;
        console.log(this.mvit);
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
    tocode(val) {
      this.$store.commit("receivedKeyWord", val);
      this.$router.push({
        path: "/searchmv"
      });
    },
    tomv(songvid) {
      this.$store.commit("receivedSongvid", songvid);
      this.$router.push({
        path: "/mv"
      });
    }
  }
};
// location. reload()
// this.$router.go(0)
</script>

<style lang="scss" scoped>
.smvl {
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
  .searchlogo {
    position: absolute;
    left: 105px;
    top: 5px;
    font-size: 21px;
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
  margin-top: 8px;
  height: 640px;
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
