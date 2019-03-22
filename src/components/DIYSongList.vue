<template>
  <div>
    <mu-expansion-panel>
      <div slot="header">我的创建的歌单</div>
      <ul v-if="divarr.length>0">
        <li class="likealbumlist" v-for="(item,i) of divarr[0].data" :key="i">
          <img :src="item.pic" class="albumpic">
          <div class="albumtitle" @click="tolist(item.id)">
            <span class="albumname">{{item.name}}</span>
            <span class="albumsinger">{{item.singer}}</span>
          </div>
        </li>
      </ul>
    </mu-expansion-panel>
  </div>
</template>
 <script>
export default {
  created() {
    this.$axios
      .get(
        `https://api.bzqll.com/music/tencent/userSongList?key=579621905&uid=1120997241`
      )
      .then(res => {
        this.divarr.push(res.data);
        console.log(this.divarr[0].data);
      });
  },
  data() {
    return {
      divarr: []
    };
  },
  computed: {
    divlist() {
      var a = [];

      return a;
    }
  },
  methods: {
    tolist(val) {
      // this.$route.path("/songlist");
      this.$router.push({
        path: "/songlist"
      });
      this.$store.commit("songlistid", val);
    }
  }
};
</script>
<style lang="scss">
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
</style>