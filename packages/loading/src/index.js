import Vue from 'vue';
import loadingVue from './loading.vue';
import { addClass, removeClass, getStyle } from '@/utils/dom'; //控制dom元素
import { PopupManager } from "@/utils/popup"; //弹窗管理
import afterLeave from '@/utils/after-leave'; //过渡动画 关闭延迟
import merge from '@/utils/merge'; //合并对象
const LoadingConstructor = Vue.extend(loadingVue);
//extend的是vue的构造器，创建一个子类参数必须是一个包含组件选项的对象
//可以理解为当在模板中遇到该组件作为标签的自定义元素时，会自动调用扩展实例构造器来生成组件实例，并挂在自定义元素上
const defaults = {
  text: null,
  fullscreen: null,
  body: false,
  lock: false,
  customClass: ''
}
let fullscreenLoading;
LoadingConstructor.prototype.originalPosition = ''; //original 最初的
LoadingConstructor.prototype.originalOverflow = '';
LoadingConstructor.prototype.close = function () {
  if (this.fullscreen) {
    fullscreenLoading = undefined;
  }
  afterLeave(this, _ => {
    const target = this.fullscreen || this.body ? document.body : this.target;
    //全屏的就操作body不是直接操作目标元素
    removeClass(target, 'el-loading-parent--relative');
    removeClass(target, 'el-loading-parent--hidden');
    if (this.$el && this.$el.parentNode) { //this.$el当前组件的元素，是在mounted中才出现
      this.$el.parentNode.removeChild(this.$el);
    }
    this.$destroy();
  }, 300);
  this.visible = false;
};
const addStyle = (options, parent, instance) => {
  let maskStyle = {}; //mask遮罩
  if (option.fullscreen) {
    instance.originalPosition = getStyle(document.body, 'position');
    instance.originalOverflow = getStyle(document.body, 'overflow');
    maskStyle.zIndex = PopupManager.nextZIndex();
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, 'position');
    ['top', 'left'].forEach(property => { //property性能
      let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
      maskStyle[property] = options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] + 'px'
    });
    ['height', 'width'].forEach(property => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
    });
  } else {
    instance.originalPosition = getStyle(parent, 'position');
  }
  Object.keys(maskStyle).forEach(property => {
    instance.$el.style[property] = maskStyle[property];
  });
};

const loading = (options = {}) => {
  if (Vue.prototype.$isServer) return;
  options = merge({}, defaults, options);
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading;
  }
  let parent = options.body ? document.body : options.target;
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  });
  addStyle(options, parent, instance);
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'el-loading-parent--relative');
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'el-loading-parent--hidden');
  }
  parent.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
  if (options.fullscreen) {
    fullscreenLoading = instance;
  }
  return instance;
};
export default loading;


