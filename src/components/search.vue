<template>
  <transition :name="transitionName">
    <div id="main" class="main" v-show="this.$store.state.searchshow">
      <div class="recommend">
        <h3>热门搜索</h3>
        <div v-for="(item,i) in hotkey" :key="i" @click="clickto(item)" class="hotkey">{{item}}</div>
      </div>
      <div class="history">
        <h3>搜索历史</h3>
        <div v-for="(item,i) in abc" :key="i" @click="clickto(item)" class="hiskey">{{item}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  el:'#main',
  props: ["abc"],
  data() {
    return {
      hotkey: [
        "张国荣",
        "张学友",
        "张敬轩",
        "追",
        "当年情",
        "提示",
        "淘汰",
        "林宥嘉",
        "起风了",
        "蔷薇",
        "邓紫棋",
        "大反派",
        "孔明锁",
        "当山美玲",
        "my boo",
        "Eminem"
      ],
      keyarr: [],
      keyword: {},
      // word: this.$store.state.Keyword,
      transitionName: "slide-top"
    };
  },
  methods: {
    clickto(val) {
      console.log("点击",val)
      this.$store.commit("receivedKeyWord", val);
      this.$router.push({
        path: "/searchlist"
      });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.slide-top-leave-active {
  opacity: 1;
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  transition: all 0.1s;
}
.slide-top-enter {
  opacity: 1;
  -webkit-transform: translateY(-100%);
  transition: all 0.1s;
  transform: translateY(-100%);
}
.main {
  width: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  height: 646px;
  transition: all 1s ease;
  background: white;
  font-size: 18px;
  z-index: 1;
}
.recommend {
  position: relative;
  height: 40%;
  width: 100%;
  // background: blue;
  .hotkey {
    display: inline-block;
    height: 20px;
    font-size: 15px;
    border-radius: 5px;
    float: left;
    margin: 5px;
    background: #ddd;
    padding: 0 6px 0 6px;
  }
}
.history {
  position: relative;
  height: 60%;
  width: 100%;
  // background: red;
  .hiskey {
    display: inline-block;
    height: 20px;
    font-size: 15px;
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
    float: left;
    margin: 5px;
    background: #ddd;
    padding: 0 5px 0 5px;
  }
}
</style>

