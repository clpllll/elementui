<template>
    <svg class="el-icon" >
      <use :xlink:href="'#icon-'+iconName"></use>
    </svg>
</template>
<script>
  export default {
    name:"ElIcon",
    props:{
      iconName:String,
      fillColor:String,
      strokeColor:String,
      strokeWidth:Number
    },
    created(){
      console.log(this.strokeColor,this.fillColor,this.strokeWidth)
    }
  }
</script>
<style rel="stylesheet/scss" scoped lang="scss">
  @import '../../theme-chalk/src/icon.scss';
</style>

