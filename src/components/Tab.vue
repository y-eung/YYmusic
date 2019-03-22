<template>
  <div class="tab">
    <router-link tag="span" to="/likesong">我的</router-link>
    <router-link tag="span" to="/Songclassification">歌单</router-link>
    <span @click="showhotMVlist(true)">热门MV</span>

    <span @click="showns(true)">新歌榜</span>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["songid"]),

  data() {
    return {};
  },
  methods: {
    showns(val) {
      this.$store.commit("showns", val);
    },
    showhotMVlist(val) {
      this.$store.commit("HotMvListShow", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 35px;
  background: #33c27d;
  font-size: 0.38rem;
  span {
    width: 25%;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 0.9rem;
  }
}
</style>