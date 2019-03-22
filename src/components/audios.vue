<template>
  <transition name="audioscss">
    <div v-show="$store.state.audioshow">
      <audio
        autoplay
        class="audios"
        id="audios"
        :src="abc"
        muted="true"
        type="audio/mp4"
        @timeupdate="updatetTime"
        @ended="play_mode_music_play(play_mode)"
      ></audio>
      <div class="audiomusic">
        <div class="left_control" @click="toaudio">
          <img :src="pic" class="pic" alt v-if="this.$store.state.songid!=''">
          <img src="../../build/logo.png" class="pic" alt v-else>
        </div>
        <div class="center_control" @click="toaudio">
          <div class="songname">
            <a
              style="color:black;font-size:16px;"
              v-if="this.$store.state.songid!=''"
            >{{$store.state.songname}}</a>
            <a style="color:black;font-size:16px;" v-else>
              <i>去寻找喜欢的歌曲吧</i>
            </a>
          </div>
          <div class="singe">
            <a
              style="color:black;font-size:14px;"
              v-if="this.$store.state.songid!=''"
            >{{$store.state.singer}}</a>
            <a style="color:black;font-size:14px;" v-else>
              <i>去找喜爱的歌手吧</i>
            </a>
          </div>
        </div>
        <div class="center_control" v-show="false">
          <!-- {{songshowarr}} -->
          <div class="play_music_info" @click="toaudio">
            <marquee behavior="alternate" scrolldelay="200">
              <a class="play_music_name">&nbsp;&nbsp;&nbsp;&nbsp;{{$store.state.songname}}</a>-
              <a>{{$store.state.singer}}&nbsp;&nbsp;&nbsp;&nbsp;</a>
            </marquee>
            <div class="songtime">
              <span>
                <i>{{sindextime}}</i>/
                <i v-html="songduration"></i>
              </span>
            </div>
          </div>
          <!-- 时间进度条 -->
          <div class="player_progress">
            <input
              type="range"
              max="100"
              min="0"
              step="1"
              id="progress"
              v-model="value"
              @input="Adjustment_time(value)"
            >
          </div>
        </div>
        <div class="right_control">
          <div class="play" id="paly" @click="Playback()">
            <i
              :class="{ 'iconfont icon-icon-test1' :ispaly==true , 'iconfont icon-icon-test':ispaly==false }"
              style="color:#33c27d;font-size:35px;"
            ></i>
          </div>
          <div class="play_music_list" @click="show_list">
            <i class="iconfont icon-icon-4" style="color:#33c27d;font-size:35px;"></i>
          </div>
        </div>
        <div class="music_list" id="music_list" v-show="listshow">
          <div class="list_head">
            <h4>播放列表</h4>
            <span class="list_head_btn" @click="clear_list()">
              <i class="iconfont icon-shanchu"></i>清空
            </span>
          </div>
          <ul>
            <li
              v-for="(item,i) in allsongarr"
              :key="i"
              v-show="allsongarr.length>0"
              :class="{list_item_on:i%2==0,list_item_off:i%2!=0}"
            >
              <span class="list_no">{{i+1}}.</span>
              <span class="list_songname">{{item.name}}</span>
              <span class="list_singer">{{item.singer}}</span>
              <i class="iconfont icon-icon-test1" @click="list_play(item.id,item.name,item.singer)"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "../common/music-ioc/iconfont.css";

export default {
  data() {
    return {
      indextime: 0,
      play_mode: 0,
      play_volume: 0,
      value: 0,
      volume: 1,
      songname: this.$store.state.songname,
      singer: this.$store.state.singer,
      songduration: 0,
      sindextime: 0,
      listshow: false,
      songarr: [],
      newitems: {},
      arrlrc: [],
      ispaly: false,
      songarrid: [],
      att: []
    };
  },
  methods: {
    //时间进行时
    updatetTime(res) {
      this.indextime = res.target.currentTime.toFixed(2);
      let indextime = this.Time_transformation(audios.currentTime);
      this.value = (audios.currentTime * 100) / audios.duration;
      let progress_bar = this.value + "% 100%";
      progress.style.backgroundSize = progress_bar;
      this.songduration = this.Time_transformation(audios.duration);
      this.sindextime = this.Time_transformation(audios.currentTime);
      this.$store.commit("songtime", this.songduration);
      this.$store.commit("songindextime", this.indextime);
      this.$store.commit("timevalue", this.value);
      this.$store.commit("indextimes", this.sindextime);
    },
    //上一首歌曲
    lastsong() {
      for (let i = 0; i <= this.songarr.length; i++) {
        if (this.$store.state.songid == this.songarr[i].id) {
          if (i - 1 == 0) {
            this.$store.commit(
              "receivedSongid",
              this.songarr[this.songarr.length - 1].id
            );
            this.$store.commit(
              "receivedSongname",
              this.songarr[this.songarr.length - 1].name
            );
            this.$store.commit(
              "receivedSongsinger",
              this.songarr[this.songarr.length - 1].singer
            );
            break;
          } else {
            this.$store.commit("receivedSongid", this.songarr[i - 1].id);
            this.$store.commit("receivedSongname", this.songarr[i - 1].name);
            this.$store.commit(
              "receivedSongsinger",
              this.songarr[i - 1].singer
            );
            break;
          }
        }
      }
    },
    //下一首多模式播放
    music_nextsong(val) {
      if (val == 2) {
        //单曲循环
        audios.load();
      } else if (val == 0) {
        //随机播放
        if (this.songarr.length == 2) {
          audios.load();
        }
        let max = this.songarr.length - 1;
        let min = 1;
        let c = Math.floor(Math.random() * (max - min + 1) + min);
        // let c = Math.floor(Math.random() * this.songarr.length);
        this.$store.commit("receivedSongid", this.songarr[c].id);
        this.$store.commit("receivedSongname", this.songarr[c].name);
        this.$store.commit("receivedSongsinger", this.songarr[c].singer);
      } else if (val == 1) {
        //顺序播放
        if (this.songarr.length == 2) {
          audios.load();
        }
        this.nextsong();
      }
    },
    //下一首歌曲
    nextsong() {
      for (let i = 0; i < this.songarr.length; i++) {
        if (this.$store.state.songid == this.songarr[i].id) {
          if (i < this.songarr.length - 1) {
            this.$store.commit("receivedSongid", this.songarr[i + 1].id);
            this.$store.commit("receivedSongname", this.songarr[i + 1].name);
            this.$store.commit(
              "receivedSongsinger",
              this.songarr[i + 1].singer
            );
          } else {
            this.$store.commit("receivedSongid", this.songarr[1].id);
            this.$store.commit("receivedSongname", this.songarr[1].name);
            this.$store.commit("receivedSongsinger", this.songarr[1].singer);
          }
          break;
        }
      }
    },
    //改变进度条时间
    Adjustment_time(val) {
      audios.currentTime = audios.duration * (val / 100);
      // console.log(val);
    },
    //切换模式播放
    play_mode_music_play(val) {
      if (val == 2) {
        //单曲循环
        audios.load();
      } else if (val == 0) {
        //随机播放
        if (this.songarr.length == 2) {
          audios.load();
        }
        let max = this.songarr.length - 1;
        let min = 1;
        let c = Math.floor(Math.random() * (max - min + 1) + min);
        // let c = Math.floor(Math.random() * this.songarr.length);
        this.$store.commit("receivedSongid", this.songarr[c].id);
        this.$store.commit("receivedSongname", this.songarr[c].name);
        this.$store.commit("receivedSongsinger", this.songarr[c].singer);
      } else if (val == 1) {
        //顺序播放
        if (this.songarr.length == 2) {
          audios.load();
        }
        this.nextsong();
      }
    },
    //切换播放模式
    //随机 单曲 顺序
    //xunhuan1 1  suiji  0    danquxunhuan 2
    play_music_mode(val) {
      switch (this.play_mode) {
        case 0:
          //随机播放
          play_music_mode.firstChild.className = "iconfont icon-xunhuan1";
          this.play_mode = 1;
          break;
        case 1:
          //列表播放
          play_music_mode.firstChild.className = "iconfont icon-danquxunhuan";
          this.play_mode = 2;
          break;
        case 2:
          //单曲循环
          play_music_mode.firstChild.className = "iconfont icon-suiji";
          this.play_mode = 0;
          break;
      }
    },
    // 音量显示
    musci_volume(val) {
      if (val == 0) {
        volume_progress_box.style.display = "-webkit-box";
        this.play_volume = 1;
      } else {
        volume_progress_box.style.display = "none";
        this.play_volume = 0;
      }
    },
    //控制音量
    volume_progress(val) {
      audios.volume = val;
      if (val > 0.5) {
        play_music_volume.lastChild.className = "iconfont icon-volume-1";
      }
      if (val < 0.5) {
        play_music_volume.lastChild.className = "iconfont icon-volume-";
      }
      if (val == 0) {
        play_music_volume.lastChild.className = "iconfont icon-volume-x";
      }
      let progress_bar = val * 100 + "% 100%";
      volume_progress.style.backgroundSize = progress_bar;
    },
    //播放/暂停
    Playback() {
      this.ispaly = !this.ispaly;
      if (!this.ispaly) {
        audios.play();
      } else {
        audios.pause();
      }
    },
    //打开播放列表
    show_list(val) {
      this.listshow = !this.listshow;
      if (this.listshow) {
        document.getElementById("music_list").style.display = "block";
      } else {
        document.getElementById("music_list").style.display = "none";
      }
      // console.log(this.songarr.length);
      console.log(this.songarr);
    },
    // 分秒转化
    Time_transformation(timeshow) {
      //时间分秒转化
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
      if (minTime > 10) {
        minTime = "0" + minTime;
      }
      if (hourTime > 10) {
        hourTime = "0" + hourTime;
      }
      if (audios.currentTime > 3600) {
        return (timeshow = hourTime + ":" + minTime + ":" + secondTime);
      }
      if (audios.currentTime > 600) {
        return (timeshow = minTime + ":" + secondTime);
      }
      if (audios.currentTime > 0) {
        return (timeshow = minTime + ":" + secondTime);
      }
    },
    //列表播放
    list_play(songid, songname, singer) {
      // console.log(songid)
      this.$store.commit("receivedSongid", songid);
      this.$store.commit("receivedSongname", songname);
      this.$store.commit("receivedSongsinger", singer);
      this.$router.push({
        path: "/audio"
      });
    },
    //清除列表
    clear_list() {
      this.songarr = [];
      console.log(this.songarr);
    },
    toaudio() {
      this.$router.push({
        path: "/audio"
      });
    },
    //数组去重
    removeDuplicates(arr) {
      var temp = {},
        r = [];
      for (var i in arr) temp[arr[i]] = true;
      for (var k in temp) r.push(k);
      return r;
    }
  },

  computed: {
    abc() {
      // console.log("sads", this.$store.state.songsound);
      this.newitems = {
        id: this.$store.state.songid,
        name: this.$store.state.songname,
        singer: this.$store.state.singer
      };
      var isYes = true;
      for (var i = 0; i < this.songarr.length; i++) {
        if (this.$store.state.songid == this.songarr[i].id) {
          isYes = false;
          break;
        }
      }
      if (isYes && this.$store.state.songid != "") {
        this.songarr.push(this.newitems);
      }
      //br为码率24 48 96 128 192 320 可用48 96 128 192
      // 48(标准) 96（高清） 320（高品质） flac(无损音质) ape（压缩无损音质）
      if (this.$store.state.songid != "") {
        return `https://vip.api.bzqll.com/music/tencent/url?id=${
          this.$store.state.songid
        }&key=765929048&br=${this.$store.state.songsound}`;
      }
    },
    ifplay() {
      console.log(audios.paused);
      return c;
    },
    pic() {
      return `https://vip.api.bzqll.com/music/tencent/pic?id=${
        this.$store.state.songid
      }&key=765929048`;
    },

    allsongarr() {
      let c = [];
      for (let i = 0; i < this.$store.state.allsongarr.length; i++) {
        this.$axios
          .get(
            `https://vip.api.bzqll.com/music/tencent/song?id=${
              this.$store.state.allsongarr[i]
            }&key=765929048`
          )
          .then(res => {
            res = res.data;
            c.push(res.data);
          });
      }
      console.log("sss", c);
      return c;
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" scoped>
.audioscss-leave-active {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  // transform: translate(, 0);
  transition: all 0.1s;
}

.audioscss-enter {
  opacity: 1;
  -webkit-transform: translate(100%, 0);
  transition: all 0.1s;
  // transform: translate(100%, 0);
}

.audiomusic {
  z-index: 12554;
  width: 100%;
  height: 50px;
  background: #ffff;
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  border-top: rgba(0, 0, 0, 0.205) 1px solid;
  right: 0;
  .left_control {
    float: left;
    width: 60px;
    height: 100%;
    .pic {
      width: 50px;
      height: 50px;
    }
    // .songname {
    //   display: block;
    //   float: left;
    //   margin: 2px;
    // }
    // .last,
    // .play,
    // .next {
    //   color: rgba(225, 225, 225, 0.8);
    //   display: -webkit-box;
    //   -webkit-box-align: center;
    //   float: left;
    //   width: 30px;
    //   height: 100%;
    //   margin-left: 3px;
    //   cursor: pointer;
    //   .iconfont {
    //     font-size: 27px;
    //   }
    // }
  }
  .center_control {
    float: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    // -webkit-box-pack: center;
    // -webkit-box-align: start;
    margin-left: 2px;
    height: 100%;
    width: 50%;
    .songname {
      display: block;
      margin: 2px;
    }
    .singe {
      display: block;
      margin-left: 4px;
    }
    .play_music_info {
      display: inherit;
      overflow: hidden;
      white-space: nowrap;
      margin-left: 5px;
      text-overflow: ellipsis;
      font-size: 14px;
      marquee {
        display: inline-grid;
        width: 100px;
      }
      .songtime {
        display: inherit;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        -webkit-box-align: start;
      }
    }
    .player_progress {
      display: inline-block;
      -webkit-box-align: center;
      font-size: 13px;
      height: 8px;
      cursor: pointer;
      input[type="range"] {
        /* 进度条 */
        -webkit-appearance: none;
        width: 170px;
        height: 6px;
        border-radius: 10px;
        background: -webkit-linear-gradient(
              rgba(255, 255, 255, 0.7),
              rgba(255, 255, 255, 0.7)
            )
            no-repeat,
          rgba(225, 225, 225, 0.6);
        background-size: 0% 100%;
        cursor: pointer;
      }
      input[type="range"]::-webkit-slider-thumb {
        /* 小圆点 */
        -webkit-appearance: none;
        opacity: 1;
        filter: none;
        margin-top: -1px;
        height: 10px;
        width: 10px;
        background: #ffffff;
        border-radius: 50%; /*外观设置为圆形*/
        box-shadow: #f1eded; /*添加底部阴影*/
        cursor: pointer;
      }
    }
  }
  .right_control {
    float: left;
    width: 133px;
    height: 100%;
    .play_music_mode {
      float: left;
      margin-left: 10px;
      height: 100%;
      color: #f1eded;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: start;
      cursor: pointer;
      .iconfont {
        font-size: 27px;
      }
    }
    .play_music_volume {
      float: left;
      margin-left: 10px;
      height: 100%;
      color: #f1eded;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: start;
      position: relative;
      cursor: pointer;

      .volume_progress_box {
        position: absolute;
        transform: rotate(-90deg);
        top: -100%;
        display: none;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        -webkit-box-align: start;
        left: 0;
        width: 100%;
        height: 100%;
        input[type="range"] {
          /* 进度条 */
          -webkit-appearance: none;
          width: 70px;
          height: 9px;
          border-radius: 10px;
          background: -webkit-linear-gradient(#ffa600, #ffa600) no-repeat,
            rgba(225, 225, 225, 0.8);
          background-size: 100% 100%;
        }
        input[type="range"]::-webkit-slider-thumb {
          /* 小圆点 */
          -webkit-appearance: none;
          opacity: 1;
          filter: none;
          margin-top: -1px;
          height: 10px;
          width: 10px;
          background: #ffffff;
          border-radius: 50%; /*外观设置为圆形*/
          box-shadow: #f1eded; /*添加底部阴影*/
        }
      }
      .iconfont {
        font-size: 34px;
      }
    }
    .play {
      color: rgba(225, 225, 225, 0.8);
      display: -webkit-box;
      -webkit-box-align: center;
      float: left;
      width: 30px;
      height: 100%;
      margin-left: 3px;
      cursor: pointer;
      .iconfont {
        font-size: 27px;
      }
    }
    .play_music_list {
      float: right;
      cursor: pointer;
      margin-right: 15px;
      height: 100%;
      color: #f1eded;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: start;
      .iconfont {
        font-size: 20px;
      }
    }
  }
}
.music_list {
  overflow: hidden;
  position: absolute;
  bottom: 50px;
  right: 0;
  width: 269px;
  z-index: 80000;
  height: 283px;
  background: #ffffff;
  overflow-y: auto;
  font-size: 0.37rem;
  .list_head {
    position: fixed;
    display: -webkit-box;
    z-index: 2022;
    -webkit-box-align: start;
    width: 100%;
    background: #33c27d;
    height: 35px;
    font-size: 16px;
    h4 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: start;
      margin-left: 20px;
    }
    .list_head_btn {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      -webkit-box-align: start;
      margin-left: 110px;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
  }
  ul {
    margin-top: 35px;
    list-style: none;
    li {
      position: relative;
      width: 100%;
      height: 31px;
    }
    .list_no {
      position: absolute;
      top: 4px;
      left: 2%;
      width: 8%;
      height: 100%;
    }
    .list_songname {
      position: absolute;
      top: 2px;
      left: 10%;
      width: 48%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .list_singer {
      position: absolute;
      top: 2px;
      left: 60%;
      width: 25%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .iconfont {
      position: absolute;
      right: 5px;
      top: 1px;
      font-size: 21px;
    }
    .list_item_on {
      background: white;
    }
    .list_item_off {
      background: rgb(241, 239, 239);
    }
  }
}
</style>
