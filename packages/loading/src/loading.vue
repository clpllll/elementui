<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask" :style="{backgoundColor: backgound || ''}" :class="[customClass,{'is-fullscreen':fullscreen}]">
      <div class="el-icon-loading-spinner">
        <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
        <el-icon v-else :iconName="spinner"></el-icon>
        <p v-if="text" class="el-loading-text">{{text}}</p>
      </div>

    </div>
  </transition>
</template>
<script>
  export default {
    name:'ElLoading',
    props:{

    },
    data(){
      return{
        text:null,
        spinner:null,
        backgound:null,
        fullscreen:true,
        visible:false,
        customClass:''
      }
    },
    methods:{
      handleAfterLeave(){
        this.$emit('afte-leave');
      },
      setText(text){
        this.text = text;
      }
    }
  }
</script>
