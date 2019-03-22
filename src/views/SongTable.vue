<template>
  <!-- 精品歌单 -->
  <transition :name="transitionName">
    <div class="songtable">
      <div class="head">
        <i @click="back" class="iconfont icon-left"></i>
        <h2 class="mylike">热门歌单</h2>
      </div>
      <mu-grid-list class="gridlist-demo" style="margin:5px;">
        <mu-sub-header></mu-sub-header>
        <mu-grid-tile
          v-for="(tile,index) in  songlistarr"
          :key="index"
          @click="tosonglist(tile.id)"
        >
          <img :src="tile.pic">
          <span slot="title">{{tile.name}}</span>
          <span slot="subTitle">
            by
            <b>{{tile.creator}}</b>
            <b
              style="float:right; margin-right: 12px;"
            >{{tile.playCount>1000?parseInt(tile.playCount/10000)+"万":tile.playCount}}</b>
          </span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </transition>
</template>
<script>
import { myMinxin } from "../mixins.js";
export default {
  data() {
    return {
      list: [
        "../assets/img/logoCard.jpg",
        "../assets/img/logoCard.jpg",
        "../assets/img/logoCard.jpg",
        "../assets/img/logoCard.jpg"
      ],
      songlistarr: [],
      transitionName: "slide-right"
    };
  },
  mixins: [myMinxin],
  beforeMount() {},
  created() {
    this.$axios
      .get(
        `https://vip.api.bzqll.com/music/tencent/hotSongList?key=765929048&categoryId=${
          this.$store.state.listclassid
        }&sortId=3&limit=10`
      )
      .then(res => {
        this.songlistarr = res.data.data;
        console.log(res.data);
      });
  },
  methods: {
    // back() {
    //   if (window.history.length <= 1) {
    //     this.$router.push({ path: "/" });
    //     return false;
    //   } else {
    //     this.$router.go(-1);
    //   }
    //   setTimeout(() => {}, 500);
    // },
    tosonglist(val) {
      this.$router.push({ path: "/songlist" });
      this.$store.commit("songlistid", val);
      console.log(this.$store.state.songlistid);
    }
  },
  computed: {
    num() {
      let a = "";
      for (let i = 0; i < this.songlistarr.length; i++) {
        console.log(i);
        if (this.songlistarr[i].playCount.length > 4) {
          let s = this.songlistarr[i].playCount.substring(
            this.songlistarr[i].playCount.length - 4,
            this.songlistarr[i].playCount.length
          );
          console.log(this.songlistarr[i].playCount);
        }
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  transition: all 0.1s;
}

.slide-right-enter {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transition: all 0.1s;
  transform: translate(100%, 0);
}
.songtable {
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  height: 100%;
  width: 100%;
  z-index: 2;
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
    .mylike {
      text-align: center;
      font-size: 27px;
    }
  }
  .gridlist-demo {
    max-height: 635px;
    overflow-y: auto;
  }
}
</style>

