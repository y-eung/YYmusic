<template>
    <div>
        <input type="text" v-model="userid" placeholder="账号">
        <button @click="lg(userid)">登录</button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userid:''
        }
    },
    methods: {
        lg(val){
            this.$store.commit('userid',val)
            console.log(this.$store.state.userid)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
