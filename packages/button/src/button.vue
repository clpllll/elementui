<template>
  <button class="el-button" 
  :disabled = "disabled || loading"
  :class="[
    size?`el-button--${size}`:'',
    type?`el-button--${type}`:'',
  {
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading':loading,
  }]"
  :autofocus = "autofocus"
  :type = "nativeType"
  >
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: "ElButton",
    props:{
      size:{
        type:String,
        default:"default"
      },
      type:{
        type:String,
        default:"primary"
      },
      plain:{
        type:Boolean,
        default:false
      },
      round:{
        type:Boolean,
        default:false
      },
      circle:{
        type:Boolean,
        default:false
      },
      loading:{
        type:Boolean,
        default:false
      },
      disabled:{
        type:Boolean,
        default:false
      },
      icon:String,
      autofocus:{
        type:Boolean,
        default:false
      },
      nativeType:{
        type:String,
        default:"button"
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-button{
    background-color: #fff;
    width: 80px;
  }
</style>
