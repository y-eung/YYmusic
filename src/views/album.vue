<template>
  <transition :name="transitionName">
    <div class="albumns">
      <div class="head">
        <i @click="back" class="iconfont icon-left"></i>
      </div>
      <div class="albumbox">
        <div class="albumview">
          <div class="album">
            <div class="album_media">
              <img class="album__cover" :src="pic">
            </div>
            <div class="album__bd">
              <h1
                class="album__name"
                :data-albumname="albumarr.name"
                :data-singername="albumarr.singer"
              >{{albumname}}</h1>
              <div class="author_singer">
                <img :src="pic" class="singrpic" alt>
                <div class="author__bd">
                  <span class="author__name">{{singer}}</span>
                </div>
              </div>
              <p class="album__time">
                发行时间：
                2019-01-09
              </p>
            </div>
          </div>
          <div class="allplay_box">
            <a class="btn_play_all" @click="to_all_play(0)">播放全部</a>
          </div>
        </div>
        <img class="albumpic" :src="pic">
      </div>
      <div class="songlist">
        <div class="count_box">
          <div class="count_box__desc">
            专辑
            <span class="count_box__number">共 {{this.albumarr.length}} 首</span>
          </div>
          <a class="collect" id="collect" @click="like(albumid)" data-type="2" href="javascript:;">
            收藏
            <i class="iconfont icon-like1"></i>
          </a>
        </div>
        <ul class="qui_list">
          <li
            class="qui_list__item"
            v-for="(item,i) in albumarr"
            :key="i"
            @click="toaudio(item.id,item.name,item.singer)"
          >
            <div class="qui_list__order">
              <span class="qui_list__decimal">{{i+1}}</span>
            </div>
            <div class="qui_list__bd">
              <div class="qui_list__box">
                <h3 class="qui_list__tit">
                  <span class="qui_list__txt">{{item.name}}</span>
                </h3>
                <p class="qui_list__desc">
                  <span class="qui_list__txt">{{item.singer}}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import "../common/music-ioc/iconfont.css";
import { myMinxin } from "../mixins.js";
export default {
  mixins: [myMinxin],
  created() {
    // console.log('sa',this.$store.state.album)
    this.$axios
      .get(
        `https://api.bzqll.com/music/tencent/album?key=579621905&id=${
          this.$store.state.album
        }`
      )
      .then(res => {
        res = res.data;
        this.albumarr = res.data.songs;
        this.albumname = res.data.name;
        this.singer = res.data.singer;
        this.pic = this.albumarr[0].pic;
        this.albumid = res.data.id;
        console.log(this.albumid);
      });
  },
  data() {
    return {
      albumname: "",
      singer: "",
      albumarr: [],
      albumid: "",
      album: this.$store.state.album,
      pic: ``,
      transitionName: "slide-right"
    };
  },
  methods: {
    toaudio(b, a, v) {
      this.$store.commit("receivedSongid", b);
      this.$store.commit("receivedSongname", a);
      this.$store.commit("receivedSongsinger", v);
    },

    to_all_play(val) {
      let songarr = [];
      do {
        // this.$store.commit("receivedSongid", this.albumarr[val].id);
        songarr.push(this.albumarr[val].id);
        val++;
      } while (val < this.albumarr.length);
      // console.log('add',songarr);
      this.$store.commit("allsongarr", songarr);
      console.log('传过去',this.$store.state.allsongarr)
    },
    like(val) {
      collect.style.color = "red";
      this.$store.commit("likealbumarr", val);
      console.log(this.$store.state.likealbumarr);
    }
  },
  watch: {}
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

.albumns {
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
.albumbox {
  position: relative;
  z-index: 4;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  .albumpic {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-transform: scale(1.1) translateZ(0);
    -webkit-filter: blur(36px);
  }
  .albumview {
    width: 100%;
    .album {
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      -webkit-box-sizing: border-box;
      width: 100%;
      margin-top: 17px;
      padding: 0 16px;
      overflow: hidden;
      .album_media {
        position: relative;
        width: 125px;
        height: 125px;
        margin-right: 10px;
        overflow: hidden;
        .album__cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 55;
          object-fit: cover;
        }
      }
      .album__bd {
        position: relative;
        z-index: 5;
        -webkit-box-flex: 1;
        .album__name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          max-height: 47px;
          line-height: 1.3;
          overflow: hidden;
          font-size: 18px;
          color: #fff;
          h1 {
            font-size: 100%;
            font-weight: 300;
            display: block;
            font-size: 2em;
            margin-block-start: 0.67em;
            margin-block-end: 0.67em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            font-weight: bold;
          }
        }
        .author_singer {
          position: relative;
          display: -webkit-box;
          -webkit-box-align: center;
          margin-top: 8px;
          overflow: hidden;
          .singrpic {
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            border-radius: 24px;
          }
          .author__bd {
            -webkit-box-flex: 1;
            .author__name {
              display: block;
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 14px;
              color: #fff;
            }
          }
        }
        .album__time {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          max-height: 36px;
          overflow: hidden;
          margin-top: 8px;
          color: #fff;
        }
      }
    }
    .allplay_box {
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      height: 84px;
      padding: 0 16px;
      -webkit-transition: 1s ease-in-out;
      .btn_play_all {
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        min-width: 130px;
        padding: 0 20px;
        height: 40px;
        overflow: hidden;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border-radius: 20px;
        background: #31c27c;
        z-index: 54;
        position: relative;
      }
    }
  }
}

.songlist {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 2;
  width: 100%;
  padding-top: calc(0.6rem + 226px);
  padding-bottom: 50px;
  overflow: hidden;
  will-change: transform;
  -webkit-transform: translateZ(0);
  .count_box {
    position: relative;
    display: -webkit-box;
    -webkit-box-align: center;
    height: 54px;
    margin: 0 16px -10px;
    font-size: 17px;
    color: gray;
    .count_box__desc {
      // font-size: 14px;
      .count_box__number {
        margin-left: 5px;
      }
    }
    .collect {
      text-decoration: none;
      position: absolute;
      top: 0;
      right: 10px;
      display: -webkit-box;
      -webkit-box-align: center;
      height: 55px;
      // font-size: 14px;
      color: #31c27c;
      .iconfont {
        display: block;
        // font-size: 20px;
        margin-left: 5px;
      }
    }
  }
  .qui_list {
    font: 300 12px/1.5 sans-serif;
    overflow: hidden;
    .qui_list__item {
      position: relative;
      display: -webkit-box;
      .qui_list__order {
        color: gray;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        width: 45px;
        margin-right: -16px;
        .qui_list__decimal {
          font-size: 16px;
        }
      }
      .qui_list__bd {
        position: relative;
        -webkit-box-flex: 1;
        display: -webkit-box;
        -webkit-box-align: center;
        padding: 10px 16px;
        overflow: hidden;
        .qui_list__box {
          -webkit-box-flex: 1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          .qui_list__tit {
            font-size: 16px;
            color: #000;
            .qui_list__txt {
              display: block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              // font-weight: normal;
              font-family: monospace;
              color: rgba(0, 0, 0, 0.829);
            }
          }
          .qui_list__desc {
            display: -webkit-box;
            -webkit-box-align: center;
            overflow: hidden;
            color: #777;
          }
        }
      }
      // .list_playmenu {
      //   padding: 12px 25px;
      // }
    }
  }
}
</style>
