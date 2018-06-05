import Vue from 'vue'
import ElButton from '../packages/button/index';
import ElButtonGroup from '../packages/button-group/index';
import ElProgress from '../packages/progress/index';
import ElIcon from '../packages/icon/index';
import Loading from '../packages/loading/index';
const components = [ElButton, ElIcon, ElButtonGroup, ElProgress];
components.map(component => {
  Vue.use(component);
  //使用全局插件
})
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
// module.exports = {
//   ElButton, ElIcon, ElButtonGroup, ElProgress,Loading
// };
// module.exports.default = module.exports;
export default JSON.parse(JSON.stringify(components)).push(Loading);