<template>
  <mu-drawer :open="open" :docked="false" :right="false" @close="close(false)" :z-depth="20">
    <div class="hear">
      <img src="../assets/img/1106740.jpg">
      <h1 class="user_name">holle worldssssssssss</h1>
    </div>
    <mu-list>
      <mu-list-item button to="/login">
        <mu-list-item-title>登录</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>个性皮肤</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>消息中心</mu-list-item-title>
      </mu-list-item>
      <mu-list-item>
        <mu-list-item-title></mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>定时开关</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>帮助与反馈</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>关于</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>设置</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>注销</mu-list-item-title>
      </mu-list-item>
      <!-- <div class="login" v-show="isRellyShow">登录</div> -->
      <div class="foot">
        <span>时间</span>
        <span>天气</span>
      </div>
    </mu-list>
  </mu-drawer>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // isRellyShow: true,
      // close: false
    };
  },
  methods: {
    hideSide: function() {
      this.$store.dispatch("hideSideBar");
    }
  },
  computed: mapState({
    open: "showDrawer"
    // baseUrl: "baseUrl",
    // self: state => state.data.self
  }),
  methods: mapMutations({
    close: "TOGGLE_SETDRAWER"
  })
};
</script>
<style lang="scss" scoped>
.hear {
  position: relative;
  height: 22%;
  background: #33c27d;
  img {
    position: absolute;
    top: 44px;
    left: 16px;
    border-radius: 50%;
    height: 70px;
    width: 70px;
  }
  .user_name {
    font-size: 22px;
    width: 140px;
    height: 36px;
    position: absolute;
    top: 35px;
    left: 100px;
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    white-space: nowrap; /* 不换行 */
    text-overflow: ellipsis;
  }
}

.leftback {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.87);
}
.leftbox {
  width: 300px;
  height: 736px;
  z-index: 25;
  background: rgba(128, 128, 128, 0.5);
  .login {
    width: 50px;
    height: 50px;
  }
}
.foot {
  width: 92%;
  height: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.13);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  span {
    display: inline-block;
    width: 49%;
    text-align: center;
    font-size: 1.7em;
    line-height: 38px;
  }
}
</style>

