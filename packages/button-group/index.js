
import ElButtonGroup from '../button/src/button-group.vue'
// install 开发全局插件
ElButtonGroup.install = function (Vue) { 
  Vue.component(ElButtonGroup.name,ElButtonGroup)
}
export default ElButtonGroup;