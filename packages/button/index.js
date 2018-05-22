
import ElButton from './src/button.vue'
// install 开发全局插件
ElButton.install = function (Vue) { 
  Vue.component(ElButton.name,ElButton)
}
export default ElButton;