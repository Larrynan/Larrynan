<template>
  <div>
    <el-container class="continer">
  <el-header>
    <Header></Header>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <Aside></Aside></el-aside>
    <el-main>
      <keep-alive>
      <router-view/>
      </keep-alive>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import Aside from './components/aside.vue'
import Header from './components/header.vue'

export default {
  components: {Aside, Header}

}
</script>

<style lang="scss" scoped>
.continer{
  height: 100vh;
}

 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

</style>
