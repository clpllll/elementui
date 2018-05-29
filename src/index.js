import Vue from 'vue'
import ElButton from '../packages/button/index';
import ElButtonGroup from '../packages/button-group/index';
import ElIcon from '../packages/icon/index';
const components = [ElButton, ElIcon, ElButtonGroup];
components.map(component => {
  Vue.use(component);
  //使用全局插件
})
export default components;