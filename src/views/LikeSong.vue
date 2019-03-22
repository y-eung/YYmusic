<template>
  <transition :name="transitionName">
    <div class="likesong">
      <div class="head">
        <i @click="back" class="iconfont icon-left"></i>
        <h2 class="mylike">我喜欢</h2>
      </div>
      <mu-tabs :value.sync="active1" inverse color="#33c27d" indicator-color="#33c27d" center>
        <mu-tab>单曲({{likesongarr.length}})</mu-tab>
        <mu-tab @click="test">专辑({{albumarr.length}})</mu-tab>
        <mu-tab>歌单({{likelist.length}})</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active1 === 0">单曲
        <ul v-if="likesongarr.length>0">
          <li
            class="likealbumlist"
            v-for="(item,i) of likesongarr"
            @click="tosongpaly(item.id)"
            :key="i"
          >
            <img :src="item.pic" class="albumpic">
            <div class="albumtitle">
              <span class="albumname">{{item.name}}</span>
              <span class="albumsinger">{{item.singer}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="demo-text" v-if="active1 === 1">专辑
        <ul v-if="albumarr.length>0">
          <li class="likealbumlist" v-for="(item,i) of albumarr" @click="toalbum(item.id)" :key="i">
            <img :src="item.songs[0].pic" class="albumpic">
            <div class="albumtitle">
              <span class="albumname">{{item.name}}</span>
              <span class="albumsinger">{{item.singer}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="demo-text" v-if="active1 === 2">歌单
        <ul v-if="likelist.length>0">
          <li class="likealbumlist" v-for="(item,i)  of likelist" @click="tolist(item.id)" :key="i">
            <img :src="item.logo" class="albumpic">
            <div class="albumtitle">
              <span class="albumname">{{item.title}}</span>
              <span class="albumsinger">{{item.author}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import { myMinxin } from "../mixins.js";
export default {
  mixins: [myMinxin],
  created() {
    // console.log("s", this.$store.state.likesongarr);
    // 专辑
    if (this.$store.state.likealbumarr.length > 0) {
      for (let i of this.$store.state.likealbumarr) {
        this.$axios
          .get(
            `https://api.bzqll.com/music/tencent/album?key=579621905&id=${i}`
          )
          .then(res => {
            let c = res.data.data;
            this.albumarr.push(c);
          });
      }
    }
    // 单曲
    if (this.$store.state.likesongarr.length > 0) {
      for (let i of this.$store.state.likesongarr) {
        this.$axios
          .get(`https://api.bzqll.com/music/tencent/song?key=579621905&id=${i}`)
          .then(res => {
            let c = res.data.data;
            // console.log(res.data.data);
            this.likesongarr.push(c);
          });
      }
    }
    //歌单
    if (this.$store.state.likesonglistarr.length > 0) {
      for (let i of this.$store.state.likesonglistarr) {
        this.$axios
          .get(
            `https://api.bzqll.com/music/tencent/songList?key=579621905&id=${i}`
          )
          .then(res => {
            let c = res.data.data;
            console.log(res.data.data);
            this.likelist.push(c);
          });
      }
    }
  },
  data() {
    return {
      active1: 0,
      albumarr: [],
      likesongarr: [],
      likelist: [],
      transitionName: "slide-right"
    };
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
    test() {
      // console.log(this.albumarr);
    },
    tosongpaly(val) {
      // 单曲
      console.log(val);
      this.$router.push({
        path: "/audio"
      });
      this.$store.commit("receivedSongid", val);
    },
    toalbum(val) {
      // 专辑
      // this.$router.path("/album");
      console.log(val);

      this.$router.push({
        path: "/album"
      });
      this.$store.commit("album", val);
    },
    tolist(val) {
      // 歌单
      console.log(val);
      this.$router.push({
        path: "/songlist"
      });
      this.$store.commit("songlistid", val);
    }
  },
  computed: {
    songarr() {}
    // newalbumarr() {}
  }
};
</script>

 <style lang="scss" scoped>
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

.likesong {
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
  .likealbumlist {
    height: 82px;
    width: 100%;
    list-style: none;
    img {
      float: left;
      width: 60px;
      height: 60px;
    }
    .albumtitle {
      height: 60px;
      margin: 3px;
      display: grid;
      .albumname {
        color: black;
        margin-left: 12px;
        font-size: 18px;
      }
      .albumsinger {
        color: rgba(128, 128, 128, 0.829);
        margin-left: 12px;
        font-size: 13px;
      }
    }
  }
  .demo-text {
    padding: 16px;
    background: #fff;
    p {
      margin: 8px 0;
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  // background: red;
  height: 100%;
  width: 100%;
  z-index: 2;
}
</style>
