<template>
  <div id="app">
    <el-button-group>
    <el-button loading type="success">按钮</el-button>
    <el-button>按钮</el-button>
    </el-button-group>
    <el-button plain disabled type="primary">按钮</el-button>
    <el-button plain round type="info">按钮</el-button>
    <el-button circle icon="hua" size="mini" type="info">ddd</el-button>
    <el-progress color='green' :percentage='50'></el-progress>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <el-icon iconName="loading"></el-icon> -->
    <svg class="icon">
      <use xlink:href="#icon-hua"></use>
    </svg>
    sss
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .icon{
  fill:#fff;
  stroke: red;
  stroke-width: 100;
} */

</style>
