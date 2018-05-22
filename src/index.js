import Vue from 'vue'
import ElButton from '../packages/button/index';
const components = [ElButton];
components.map(component => {
  Vue.use(component);
  //使用全局插件
})
export default components;