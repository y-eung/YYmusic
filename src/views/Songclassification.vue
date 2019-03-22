<template>
  <!-- classification -->
  <div class="songclass">
    <div class="head">
      <i @click="back" class="iconfont icon-left"></i>
    </div>
    <div class="sclass" v-for="(item,i) in classarr" :key="i">
      <h2 class="categoryGroupName">{{item.categoryGroupName}}</h2>
       <!-- :to="{ name: 'replydetails', query: { id: $route.query.newsid}}" -->
      <span
        v-for="(sitem,j) in classarr[i].items"
        :key="j"
        class="categoryName"
        @click="tolist(sitem.categoryId)"
      >{{sitem.categoryName}}</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {myMinxin} from '../mixins.js'
export default {
  created() {
    this.$axios
      .get(`https://vip.api.bzqll.com/music/tencent/songListCategory?key=765929048`)
      .then(res => {
        this.classarr = res.data.data;
        console.log(res.data.data);
      });
  },
  mixins: [myMinxin],
  data() {
    return {
      classarr: []
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
    tolist(val) {
      this.$store.commit('listclassid',val)
      this.$router.push({path:'/songtable'});
      console.log(val);
    }
  },
  computed: {
    Languages() {
      let c = [];
      let a = this.classarr[1];
      for (let i of a.items) {
        c.push(i);
      }
      return c;
    }
  }
};
</script>

<style lang="scss" scoped>
.songclass {
  position: absolute;
  top: 0;
  left: 0;
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
  .sear {
  }
  .sclass {
    display: table;
    // min-height: 100px;
    margin-top: 12px;
    width: 100%;
    padding: 0 5px;
    .categoryGroupName {
      font-size: 21px;
    }
    .categoryName {
      display: inline-block;
      font-size: 17px;
      white-space: nowrap;
      margin-left: 10px;
    }
  }
}
</style>
