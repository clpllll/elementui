
import ElIcon from './src/icon.vue'
// // install 开发全局插件
ElIcon.install = function (Vue) { 
  Vue.component(ElIcon.name,ElIcon)
}
export default ElIcon;

// import Vue from 'vue';
// import ElIcon from './src/icon.vue';
// Vue.component('ElIcon',ElIcon); //注册全局组件
//第二个参数false不处理子文件夹下的svg文件
//svg 文件夹下的所有的.svg文件
const requireAll = requireContext => requireContext.keys().map(requireContext);
// console.log(require);
const req = require.context('./svg', false, /\.svg$/); 
 requireAll(req)
