<template>
  <div class="user">
    <router-link v-for="(item,i) in className" tag="span" :key="i" :to="item.path">
      <i class="iconfont" :class="item.cla"></i>
      <b>{{item.tab}}</b>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      className: [
        { tab: "全部音乐", cla: "icon-changpian", path: "/songclassification" },
        { tab: "下载音乐", cla: "icon-xiazai", path: "/likesong" },
        { tab: "最近播放", cla: "icon-icon-4", path: "/likesong" },
        { tab: "我喜欢的", cla: "icon-xiai", path: "/likesong" },
        { tab: "我的歌单", cla: "icon-shoucang", path: "/likesong" },
        { tab: "运动必备", cla: "icon-yundong", path: "/songtable" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.user {
  width: 100%;
  height: 200px;
  background: white;
  span {
    margin-top: 5px;
    display: block;
    width: 25%;
    height: 2rem;
    float: left;
    position: relative;

    i {
      display: block;
      width: 100%;
      text-align: center;
      color: #33c27d;
      font-size: 1rem;
    }
    b {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 0.34rem;
    }
  }
}
</style>
