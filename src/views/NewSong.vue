<template>
  <transition :name="transitionName">
    <div class="ns" v-show="this.$store.state.showns">
      <div class="hear">
        <i @click="backs" class="iconfont icon-left"></i>
        <b>Q Q 新 歌 榜</b>
        <span class="time">{{nsdata.date}}</span>
      </div>
      <div class="songlist">
        <table>
          <tr>
            <th class="no">排名</th>
            <th class="song">歌曲</th>
            <th class="operation">操作</th>
            <th class="author">作者</th>
            <th class="songtime">专辑</th>
          </tr>
          <!-- songname.data.songmid -->
          <tr v-for="(songname,i) in nsdata.songlist" :key="i">
            <router-link tag="td" to="#" class="no">{{i+1}}.</router-link>
            <td @click="sname(songname.data.songname)" class="song">{{songname.data.songname}}</td>
            <td
              class="play"
              @click="songid(songname.data.songmid,songname.data.singer[0].name,songname.data.songname,songname.data.vid)"
            >播放</td>
            <router-link tag="td" to="/#" class="author">{{songname.data.singer[0].name}}</router-link>
            <td @click="salbum(songname.data.albummid)" class="songtime">{{songname.data.albumname}}</td>
          </tr>
        </table>
      </div>
      <!-- <div class="foot" v-show="shows"></div> -->
    </div>
  </transition>
</template>
<script>
import "../assets/scss/slide.css";
export default {
  created() {
    this.$axios.get("/api/music").then(res => {
      res = res.data;
      this.nsdata = JSON.parse(res); //将res字符转换json
      this.shows = true;
      // console.log(res);
    });
  },
  data() {
    return {
      nsdata: {},
      songssid: this.$store.state.songid,
      shows: false,
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  methods: {
    songid(songid, singer, name, vid, pic, album) {
      this.$store.commit("receivedSongid", songid); //想后台提交数据
      this.$store.commit("receivedSongsinger", singer);
      this.$store.commit("receivedSongname", name);
      this.$store.commit("receivedSongvid", vid);
      this.$store.commit("receivedSongpic", pic);
      this.$store.commit("album", album);
      // this.$store.commit("lrcshow", true);
      this.$router.push({
        path: "/audio"
      });
    },
    sname(name) {
      this.$store.commit("receivedKeyWord", name);
      this.$router.push({
        path: "/searchlist"
      });
    },
    salbum(name) {
      this.$store.commit("album", name);
      this.$router.push({
        path: "/album"
      });
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
        this.transitionName = "slide-left";
      }
      setTimeout(() => {}, 500);
    },
    backs() {
      this.$store.commit("showns", false);
    }
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack; //  监听路由变化时的状态为前进还是后退
      console.log(this.$router.isBack);
      if (isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.$router.isBack = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.ns {
  // position: relative;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.8s ease;
  background: white;
  //  top: 40px;
  font-size: 25px;
  height: 736px;
  z-index: 3;
  .hear {
    width: 100%;
    height: 200px;
    background: #33c27d;
    i {
      position: absolute;
      font-size: 20px;
      top: 8px;
      left: 8px;
    }
    b {
      position: absolute;
      font-size: 35px;
      top: 50px;
      left: 110px;
    }
    .time {
      position: absolute;
      top: 150px;
      left: 150px;
      font-size: 20px;
    }
  }
  .songlist {
    max-height: 486px;
    overflow-y: auto;
    table {
      font-size: 25px;
      tr {
        width: 414px;
        th {
          width: 50px;
          height: 30px;
          float: left;
          font-size: 18px;
          text-align: center;
        }
        td {
          width: 50px;
          height: 30px;
          float: left;
          text-align: center;
          font-size: 15px;
        }
        .on {
          width: 10px;
          height: 30px;
        }
        .song {
          width: 120px;
          height: 30px;
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis;
        }
        .play {
          font-size: 15px;
          text-decoration: none;
          color: rgb(202, 199, 199);
        }
        .author {
          width: 80px;
          height: 30px;
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis;
        }
        .songtime {
          width: 80px;
          height: 30px;
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
