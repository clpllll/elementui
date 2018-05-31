<template>
  <div class="el-progress" :class="['el-progress--'+type,status? 'is-'+status:'',{
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
    <div v-else class="el-press-circle" :style="{height:width+'px', width: width+ 'px'}">
      <!-- 画布 -->
      <svg viewBox="0 0 100 100">
        <path class="el-progress-circle__track" :d="trackPath" stroke="#e5eaf2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="el-propress-circle__path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div v-if="!textInside && showText" class="el-progress__text">
      <template v-if="!status">{{percentage}}%</template>
      <el-icon v-else :iconName="status" ></el-icon>
    </div>
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
      },
      relativeStrokeWidth(){
        return (this.strokeWidth / this.width * 100).toFixed(1)
      },
      trackPath(){
        const radius = parse(50 - parseFloat(this.relativeStrokeWidth) / 2,10);
        return `M 50 50 m 0 - ${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
      },
      permeter(){
        const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
        return 2 * Math.PI *radius;
      },
      circlePathStyle(){
        const perimeter = this.permeter;
        return {
          strokeDasharry:`${perimeter}px,${perimeter}`,
          strokeDashoffset:(1 - this.percentage / 100) * perimeter + 'px',
          transtion: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      },
      stroke(){
        let ret;
        if(this.color){
          ret = this.color;
        }else{
          switch (this.status) {
            case 'success':
              ret = '#13ce66';
              break;
            case 'exception':
              ret = '#ff4949';
              break;
            default:
              ret = '#20a0ff';
          }
        }
        return ret;
      },
      iconClass() {
        if(this.type === 'line'){
          return this.status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross';
        }else{
          return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
        }
      },
      progressTextSize() {
        return this.type === 'line'? 12 + this.strokeWidth * 0.4 : this.width * 0.111111 + 2;
      }
    }
  }
</script>
<style scoped lang="scss">
@import '../../theme-chalk/src/progress.scss';
</style>

