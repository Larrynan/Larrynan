<template>
  <div>
    <el-button type="primary" @click="test">点击登陆</el-button>
  </div>
</template>

<script>
import { LOGIN } from '@/api/axios.js'
export default{
  methods: {
    test () {
      console.log('测试请求方法')
      LOGIN().then(res => {
        if (res.data) {
          this.$store.commit('set_token', res.data.uuid)
          this.$router.push('/home')
        }
      })
    }
  }

}
</script>
<style lang="scss" scoped>
div{
  text-align: center;
  margin-top: 300px;
}

</style>
