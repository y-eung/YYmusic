<template>
  <div class="banner">
    <transition-group>
      <img
        class="img"
        v-for="(item,index) in images"
        :key="item.id"
        v-show="index===currentIndex"
        :src="item.src"
      >
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        { id: 0, src: require("../assets/img/1109234.jpg") },
        { id: 1, src: require("../assets/img/1106740.jpg") }
      ],
      currentIndex: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        if (this.currentIndex >= this.images.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
      }, 2000);
    });
  }
};
</script>
<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 165px;
  .img {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 414px;
    height: 165px;
  }
  .page-control {
    position: absolute;
    padding: 4px 8px;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0;
    background: rgba(7, 17, 27, 0.4);
    border-radius: 12px;
    .page {
      display: inline-block;
      margin: 0 5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #fff;
      .page.active {
        background: #fc0;
      }
    }
  }
}
</style>
