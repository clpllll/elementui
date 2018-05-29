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
    <el-icon class="el-icon-loading" v-if="loading" iconName="loading"></el-icon>
    <el-icon v-if="!loading && icon" :iconName="icon"></el-icon>
    <slot v-if="!icon && $slots.default"></slot>
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
      type:String,
      plain:Boolean,
      round:Boolean,
      circle:Boolean,
      loading:Boolean,
      disabled:Boolean,
      icon:String,
      autofocus:Boolean,
      nativeType:{
        type:String,
        default:"button"
      }
    },
    computed:{
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../theme-chalk/src/button.scss';
</style>
