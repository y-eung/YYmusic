export const myMinxin = {
  created() {
    // this.back()
  },
  methods: {
    back() {
      if (window.history.length <= 1) {
        this.$router.push({
          path: "/"
        });
        return false;
      } else {
        this.$router.go(-1);
        this.$store.commit('audioshow',true)
        console.log('mixin返回')
      }
      setTimeout(() => {}, 500);
    },
  }
}
