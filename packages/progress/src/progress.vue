<template>
  <div class="el-progress" :class="['el-progress--'+type,status? 'is'+status:'',{
    'el-progress--without-text':!showText,
    'el-progress--text-inside':textInside
  }]" style="">
    <div class="el-progress-bar" v-if="type === 'line'">
      <div class="el-progress-bar__outer" :style="{height:strokeWidth + 'px'}">
        <div class="el-progress-bar__inner" :style="barStyle">
          <div v-if="type === 'line' && textInside" class="el-progress-bar__innerText">{{percentage}}%</div>
        </div>
      </div>
    </div>
    <div v-if="!textInside && showText" class="el-progress__text">{{percentage}}%</div>
  </div>
</template>
<script>
  export default {
    name: 'ElProgress',
    props:{
      percentage:{
        type:Number,
        default:0,
        validator:val => val>=0 && val<=100
      },
      type:{
        type:String,
        default:'line',
        validator: val => ['line','circle'].indexOf(val) > -1
      },
      strokeWidth:{
        type:Number,
        default:6
      },
      textInside:{
        type:Boolean,
        default:false
      },
      status:String,
      color:String,
      width:{
        type:Number,
        default:126
      },
      showText:{
        type:Boolean,
        default:true
      }
    },
    computed:{
      barStyle(){
        const style={};
        style.width = this.percentage + '%';
        style.backgrounColor = this.color;
        return style;
      }
    }
  }
</script>
<style scoped lang="scss">
// @import '../../theme-chalk/src/progress.scss';
</style>

