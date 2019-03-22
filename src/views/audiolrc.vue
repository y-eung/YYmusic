<template>
  <transition :name="transitionName">
    <div class="audiolrc">
      <div class="alll">
        <div class="head">
          <i @click="back" class="iconfont icon-left"></i>
        </div>
        <div class="songmesview">
          <img class="songmpic" :src="this.songarr.pic" alt>
          <div class="mesview">
            <div class="songname">{{this.songarr.name}}</div>
            <div class="singer">{{this.songarr.singer}}</div>
            <div class="songtab">
              <mu-menu placement="top-start" class="quality" open-on-hover>
                <mu-button color="primary" clas flat :ripple="false">音质</mu-button>
                <mu-list slot="content" default>
                  <mu-list-item button :ripple="false" @click="sound(48)">
                    <mu-list-item-title>标准</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item button default :ripple="false" @click="sound(96)">
                    <mu-list-item-title>高清</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item button default :ripple="false" @click="sound(320)">
                    <mu-list-item-title>高品质</mu-list-item-title>
                  </mu-list-item>
                </mu-list>
              </mu-menu>
              <mu-button color="primary" @click="tomv()" class="mv" flat :ripple="false">mv</mu-button>
            </div>
            <div class="lrcbox">
              <div
                class="lrcp"
                :style="{transform: 'translateY(-'+(indexooo+150)+'px)' , transition: '-webkit-transform 0.3s ease-out'}"
              >
                <p v-for="(item,i) in arrlrc" :key="i" :class="{'indexlrc': i == indexline}">
                  {{item.c}}
                  <br>
                  <span
                    v-if="Lyriced.length>1"
                    v-show="Lyricedshow && Lyriced[i].c!='//'"
                  >{{Lyriced[i].c}}</span>
                </p>
              </div>
            </div>
            <mu-button
              color="primary"
              v-if="Lyriced.length>1"
              @click="lyricshow()"
              flat
              class="Lyricsed"
              :ripple="false"
            >歌词翻译</mu-button>

            <div class="audiotab">
              <div class="audiotime">
                <span>{{$store.state.indextimes}}</span>
                <mu-slider
                  class="demo-slider"
                  color="#33c27d"
                  v-model="$store.state.timevalue"
                  @change="valuechange($store.state.timevalue)"
                ></mu-slider>
                <span>{{$store.state.songtime}}</span>
              </div>
              <div class="audiobtn">
                <div class="mode" @click="playmode">
                  <!-- icon-icon-test8 -->
                  <i :class="playmodes" style="color:black;font-size:35px;"></i>
                </div>
                <div class="mode_play">
                  <i class="iconfont icon-icon-1" @click="last" style="color:gruy;font-size:45px;"></i>
                  <i :class="ispalynow" @click="isplay(plays)" style="color:gruy;font-size:55px;"></i>
                  <!-- icon-icon-test1 -->
                  <i class="iconfont icon-icon-" @click="next" style="color:gruy;font-size:45px;"></i>
                </div>
                <div class="mode_list">
                  <i
                    class="iconfont icon-icon-4"
                    @click="isshowlist"
                    style="color:gruy;font-size:35px;"
                  ></i>
                </div>
              </div>
              <div class="lrctab">
                <div v-show="false">{{upsongtime}}</div>
                <mu-button color="primary" @click="download()" flat :ripple="false">
                  <i class="iconfont icon-xiazai" style="font-size:28px;color:#33c27d;"></i>
                </mu-button>
                <mu-button color="primary" @click="likesong(songarr.id)" flat :ripple="false">
                  <i class="iconfont icon-xiai" style="font-size:28px;color:#33c27d;"></i>
                </mu-button>
                <mu-button color="primary" flat :ripple="false">
                  <i class="iconfont icon-pinglun" style="font-size:28px;color:#33c27d;"></i>
                </mu-button>
                <mu-button color="primary" flat :ripple="false" @click="isplay">
                  <i class="iconfont icon-fenxiang" style="font-size:28px;color:#33c27d;"></i>
                </mu-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { myMinxin } from "../mixins.js";
import "../common/music-ioc/iconfont.css";

export default {
  created() {
    //获取歌曲信息
    this.$axios
      .get(
        `https://vip.api.bzqll.com/music/tencent/song?key=765929048&id=${
          this.$store.state.songid
        }`
      )
      .then(res => {
        res = res.data;
        this.songarr = res.data;
        console.log(res.data);
      });
    // 00322M6t3GxSPt
    this.$store.commit("audioshow", false);
    //歌词
    this.$axios
      .get(
        `https://vip.api.bzqll.com/music/tencent/lrc?id=${
          this.$store.state.songid
        }&key=765929048`
      )
      .then(res => {
        res = res.data;
        this.songlrc = res;
        var lrcsss = "";
        var LyricsArray = new Array();
        var LyricedArray = new Array();
        let caa = res.split("\n");
        var translatearr = res.split(caa[0]);
        //

        // let text =res.split(/[\[ti:\]]/)
        // console.log("tt",text)

        // console.log(caa[0])
        //原歌词
        var Lyrics = translatearr[1].split("\n");
        let axxx = [];
        Lyrics.map(item => {
          var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
          axxx.push({
            t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(2),
            c: item.substring(item.indexOf("]") + 1, item.length)
          });
        });
        this.arrlrc = axxx;
        //翻译后的歌词
        if (translatearr.length > 2) {
          var Lyriced = translatearr[2].split("\n");
          let v = [];
          Lyriced.map(item => {
            var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            v.push({
              t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(
                2
              ),
              c: item.substring(item.indexOf("]") + 1, item.length)
            });
          });
          this.Lyriced = v;
        }
      });
  },
  mixins: [myMinxin],
  props: ["plays"],
  data() {
    return {
      translateY: "translateY(-25px)",
      songlrc: "",
      arrlrc: [],
      songarr: {},
      songpic: "",
      indexline: 5, //当前行数
      transitionName: "slide-right",
      Lyric: [],
      Lyriced: [],
      Lyricedshow: true,
      indexooo: 0,
      vssal: 50,
      play_mode: 0,
      playmodes: "iconfont icon-icon-test2",
      songid: this.$store.state.songid,
      ispalynow: "iconfont icon-icon-test"
    };
  },
  methods: {
    //歌词滚动
    lrcline(val) {
      for (var i = 5; i < this.arrlrc.length; i++) {
        if (i < this.arrlrc.length) {
          if (this.arrlrc[i].t - val <= 0.5) {
            this.indexline = i;
          }
        } else {
          // console.log("over");
        }
      }
    },
    valuechange(val) {
      this.$emit("indexsssss", val);
      // this.$store.commit('',val);
      console.log("val", val);
    },
    lyricshow() {
      this.Lyricedshow = !this.Lyricedshow;
    },
    //路由mv页面
    tomv() {
      this.$router.push({
        path: "/mv"
      });
    },
    likesong(val) {
      this.$store.commit("likesongarr", val);
    },
    sound(val) {
      this.$store.commit("songsound", val);
      // console.log("sound", this.$store.state.songsound);
    },
    download(val) {
      var url2 =
        "https://dl.stream.qqmusic.qq.com/C400001YiC9T3a55DF.m4a?vkey=8E9237A86760D6625BA87EFC60D1A48799BCF2218C5DE714AADD443DB8923310445D09F82243E826BD669B4BDD9A80927C217E7A242463C4&guid=1552807360&uin=0&fromtag=38";
      window.location.href = url2;
    },
    isplay(val) {
      if (val) {
        this.ispalynow = "iconfont icon-icon-test";
      } else {
        this.ispalynow = "iconfont icon-icon-test1";
      }
      this.$emit("getrefs", 123);
    },
    next() {
      this.$emit("next");
    },
    isshowlist() {
      this.$emit("isshowlist");
    },
    last() {
      this.$emit("last");
    },
    playback() {
      this.$emit("playback");
    },
    playmode() {
      console.log(123);

      switch (this.play_mode) {
        case 0:
          this.playmodes = "iconfont icon-icon-3";
          this.play_mode = 1;
          break;
        case 1:
          this.playmodes = "iconfont icon-icon-2";
          this.play_mode = 2;
          break;
        case 2:
          this.playmodes = "iconfont icon-icon-test2";
          this.play_mode = 0;
          break;
      }
    }
  },
  computed: {
    upsongtime() {
      let c = 0;
      c = this.$store.state.songindextime;
      this.lrcline(c);
      return c;
    },
    range() {
      // let c=0;
      // let c = this.$store.state.songindextime;
      let a = this.$store.state.songtime;
      console.log(a);
      return a;
    },

    updateid() {
      return this.$store.state.songid;
    },
    arrid() {
      return this.$store.state.songid;
    },
    // 下载地址
    songdownload() {
      return `https://vip.api.bzqll.com/music/tencent/url?id=${
        this.$store.state.songid
      }&key=765929048&br=${this.$store.state.songsound}`;
    }
  },
  watch: {
    songid(newval, oldval) {
      this.$axios
        .get(
          `https://vip.api.bzqll.com/music/tencent/lrc?id=${newval}&key=765929048`
        )
        .then(res => {
          res = res.data;
          this.songlrc = res;
          var lrcsss = "";
          var medisArray = new Array();
          var Lyrics = res.split("\n");
          $.each(Lyrics, function(i, item) {
            var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            medisArray.push({
              t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(
                2
              ),
              c: item.substring(item.indexOf("]") + 1, item.length)
            });
          });
          this.arrlrc = medisArray;
        });
    },
    arrid(newval, oldval) {
      this.$axios
        .get(
          `https://vip.api.bzqll.com/music/tencent/song?key=765929048&id=${
            this.$store.state.songid
          }`
        )
        .then(res => {
          res = res.data;
          this.songarr = res.data;
          console.log(res.data);
        });
      // 00322M6t3GxSPt
      this.$store.commit("audioshow", false);
      //歌词
      this.$axios
        .get(
          `https://vip.api.bzqll.com/music/tencent/lrc?id=${
            this.$store.state.songid
          }&key=765929048`
        )
        .then(res => {
          res = res.data;
          this.songlrc = res;
          var lrcsss = "";
          var LyricsArray = new Array();
          var LyricedArray = new Array();
          let caa = res.split("\n");
          var translatearr = res.split(caa[0]);
          //

          // let text =res.split(/[\[ti:\]]/)
          // console.log("tt",text)

          // console.log(caa[0])
          //原歌词
          var Lyrics = translatearr[1].split("\n");
          let axxx = [];
          Lyrics.map(item => {
            var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            axxx.push({
              t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(
                2
              ),
              c: item.substring(item.indexOf("]") + 1, item.length)
            });
          });
          this.arrlrc = axxx;
          //翻译后的歌词
          if (translatearr.length > 2) {
            var Lyriced = translatearr[2].split("\n");
            let v = [];
            Lyriced.map(item => {
              var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
              v.push({
                t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(
                  2
                ),
                c: item.substring(item.indexOf("]") + 1, item.length)
              });
            });
            this.Lyriced = v;
          }
        });
    },
    indexline(newval, oldval) {
      if (newval != oldval) {
        if (newval > 5) {
          let c = document.getElementsByClassName("indexlrc");
          this.indexooo = c[0].offsetTop;
          // console.log(newval);
        }
      }
    },
    upsongtime(newval, oldval) {
      // if (newval != oldval) {
      //   let c = document.getElementsByClassName("indexlrc");
      //   this.indexooo = c[0].offsetTop;
      // }
    }
  }
};
</script>
<style>
</style>


<style lang="scss" scoped>
$green: #33c27d;
.Router {
  position: absolute;
  width: 100%;
  transition: all 0.8s ease;
  //  top: 40px;
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
.audiolrc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 736px;
  transition: all 0.8s ease;
  background: white;
  //  top: 40px;
  z-index: 25;
}

.alll {
  position: absolute;
  width: 100%;
  transition: all 3s ease;
  .head {
    width: 100%;
    height: 40px;
    background: $green;
    position: relative;
    i {
      position: absolute;
      font-size: 20px;
      top: 8px;
      left: 8px;
    }
  }
  .songmesview {
    position: relative;
    width: 100%;
    .songmpic {
      position: absolute;
      width: 100%;
      height: 696px;
      top: 0;
      left: 0;
    }
    .mesview {
      background: rgba(255, 255, 255, 0.85);
      position: absolute;
      width: 100%;
      height: 696px;
      top: 0;
      left: 0;
      // overflow: hidden;
      text-align: center;
      .songname {
        width: 100%;
        text-align: center;
        font-size: 30px;
      }
      .Lyricsed {
        position: absolute;
        bottom: 180px;
        right: 5px;
      }
      .songtab {
        width: 100%;
        height: 50px;
        // background: #33c27d;
        //   .quality{
        //   position: absolute;
        //   bottom: 85px;
        //   left: 5px;
        // }
      }

      .mvsrc {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 25px;
      }
      .likesong {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 50px;
        bottom: 25px;
      }
      .lyricshow {
        //  width: 50px;
        height: 50px;
        position: absolute;
        left: 100px;
        bottom: 25px;
      }
      .singer {
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin-top: 2px;
      }
      .lrc {
        display: block;
        width: 100%;
        height: 4rem;
        overflow: hidden;
        margin: 0 auto;
        resize: none;
        font-size: 0.5rem;
        text-align: center;
        border: none;
      }
      .lrcbox {
        position: absolute;
        width: 100%;
        height: 400px;
        // overflow-y:auto;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.6) 15%,
          rgba(255, 255, 255, 1) 25%,
          rgba(255, 255, 255, 1) 75%,
          rgba(255, 255, 255, 0.6) 85%,
          rgba(255, 255, 255, 0) 100%
        );
        // cursor: -webkit-grab;
        .lrcp {
          width: 100%;
          height: 5rem;
          margin-top: 250px;
          font-size: 0.4rem;
          // transition: all 0.8s;
          .lrcy {
            min-height: 20px;
          }
        }
        .indexlrc {
          color: #33c27d;
          // transition: all 0.8s inherit;
          // font-size: 23px;
        }
      }
      .audiotab {
        position: absolute;
        bottom: 0;
        width: 100%;
        .audiotime {
          width: 100%;
          display: -webkit-box;
          -webkit-box-pack: center;
          // align-items: flex-start;
          font-size: 16px;
          .demo-slider {
            width: 300px;
            margin: 0 10px;
          }
        }
        .audiobtn {
          width: 100%;
          display: -webkit-box;
          -webkit-box-pack: justify;
          .mode {
            margin-left: 30px;
          }
          .mode_play {
            margin-top: -15px;
          }
          .mode_list {
            margin-right: 30px;
          }
        }
        .lrctab {
          // position: absolute;
          // bottom: 0;
          // left: 0;
          .mv {
          }
          align-items: center;
          width: 100%;
        }
      }
    }
  }

  audio {
    width: 100%;
    height: 50px;
    background: #f1f3f4;
    border: none;
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
