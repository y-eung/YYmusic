<template>
  <div class="head" id="head">
    <div class="user">
      <i @click="toleft(true)" class="iconfont icon-geshou"></i>
    </div>
    <div class="searchlogo">
      <i class="iconfont icon-chaxun"></i>
    </div>
    <!-- @keyup.enter="tocode" -->
    <input
      type="text"
      placeholder=" 搜索歌曲、歌单、专辑"
      class="search"
      v-model="Keyword"
      @focus="tocode"
      @keyup.enter="tosearch(Keyword)"
    >
    <!--  @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
    @leave="leave"-->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="cancel" @click="leavecode" v-show="this.$store.state.searchshow">取消</div>
    </transition>
    <!-- @keydown.enter.native="tocode()" -->
    <div class="lefthead">
      <router-link tag="i" to="/ccc" class="iconfont icon-saoyisao"></router-link>
    </div>
    <!-- @keydown.enter="tosearch" -->
  </div>
</template>
<script >
import left from "./left";
export default {
  data() {
    return {
      Keyword: this.$store.state.Keyword,
      cancelshow: false,
      fade: "fade"
    };
  },
  components: {
    left: left
  },
  methods: {
    tocode() {
      this.$store.commit("searchshow", true);
      // this.cancelshow=true;
      // this.$router.push({
      //   path: "/searchlist"
      // });
    },
    leavecode() {
      this.$store.commit("searchshow", false);
      // this.cancelshow=false;
    },
    tosearch(val) {
      this.$emit("getkey", val);
      this.$router.push({
        path: "/searchlist"
      });
    },
    toleft(val) {
      this.$store.commit("showSideBar", val);
    },
    beforeEnter(el) {
      el.style.transform = "scale(0)";
      el.style.dispaly = "inline-block";
    },
    enter(el, done) {
      let a=el.offsetWidth;
      el.style.transform = "scale(1)";
      el.style.transition = "all 0.6s linear";
    },
    beforeLeave(el) {
      el.style.transform = "scale(1)";
    },
    leave(el) {
      el.style.transition = "all .5s linear";
      el.style.transform = "scale(0)";
    }
  },
  watch: {
    Keyword(Keystr) {
      this.$store.commit("receivedKeyWord", Keystr);
      // console.log(this.$store.state.Keyword);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
// .fade-enter.active,
// .fade-leave.active {
//   transition: 1s all linear;
//   transform: scale(1);
// }

// .fade-enter {
//   transform: scale(0);
// }
// .fade-leave {
//   transform: scale(0);
// }
// scale
.head {
  width: 100%;
  height: 40px;
  background: #33c27d;
  position: relative;
  z-index: 2;
  .searchlogo {
    position: absolute;
    left: 127px;
    top: 12px;
    z-index: 2;
  }
  .cancel {
    position: absolute;
    top: 10px;
    left: 280px;
    width: 32px;
    height: 20px;
    font-size: 14px;
    background: #ddd;
    border-radius: 5px;
    text-align: center;
  }
  .search {
    position: absolute;
    width: 150px;
    height: 25px;
    background: #2bab69;
    border-radius: 5px;
    border: none;
    padding-left: 28px;
    outline: none;
    color: white;
    top: 8px;
    left: 120px;
  }
  .user {
    position: absolute;
    top: 7px;
    left: 12px;
    color: white;
    .iconfont {
      font-size: 22px;
    }
  }
  .lefthead {
    position: absolute;
    right: 12px;
    top: 7px;
    color: white;
    .iconfont {
      font-size: 20px;
    }
  }
}
</style>

