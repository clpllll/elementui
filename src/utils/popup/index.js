import Vue from 'vue';
import merge from '@/utils/merge'; //merge合并对象
import PopupManager from '@/utils/popup/popup-manager'; //弹窗管理
import getScrollBarWidth from '@/utils/scrollbar-width';
import {
  getStyle
} from '../dom';

let idSeed = 1;
const transitions = []; //过渡
const hookTransition = (transition) => { //连接过渡
  if (transitions.indexOf(transition) !== -1) return;
  const getVueInstance = (element) => {
    let instance = element.__vue__;
    if (!instance) {
      const textNode = element.previousSibling;
      if (textNode.__vue__) {
        instance = textNode.__vue__;
      }
    }
    return instance;
  };
  Vue.transition(transition, {
    afterEnter(el) {
      const instance = getVueInstance(el);
      if (instance) {
        instance.doAfterOpen && instance.doAfterOpen();
      }
    },
    afterLeave(el) {
      const instance = getVueInstance(el);
      if (instance) {
        instance.doAfterClose && instance.doAfterClose();
      }
    }
  });
};
let scrollBarWidth;
const getDOM = function (dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    openDelay: {}, //打开延迟
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: { //模态框消失
      type: Boolean,
      defalut: true
    },
    modalClass: {},
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: { //press压迫 escape逃跑
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  created() {
    if (this.transition) {
      hookTransition(this.transition);
    }
  },
  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    PopupManager.register(this._popupId, this);
  },
  beforeDestroy() { //生命钩子销毁之前
    PopupManager.deregister(this._popupId); //撤销
    PopupManager.closeModal(this._popupId);
    if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }
    this.bodyOverflow = null;
    this.bodyPaddingRight = null;
  },
  data() {
    return {
      opened: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true; //rendered 已渲染
          Vue.nexTick(() => {
            //dom更新之后
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },
  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
      }
      //this.$props 当前组件接收到的props对象
      const props = merge({}, this.$props || this, options);
      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);
      const openDelay = Number(props.openDelay); //打开延迟
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },
    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;
      this._openting = true;
      const dom = getDom(this.$el);
      const modal = props.modal;
      const zIndex = props.zIndex;
      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }
      if (modal) {
        if (this._closing) {
          PopupManager.closeModal(this._popupId);
          this._closing = false;
        }
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, prop.modalFade);
        if (props.lockScroll) {
          if (!this.bodyOverflow) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.bodyOverflow = document.body.style.overflow;
          }
          scrollBarWidth = getScrollBarWidth();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          let bodyOverflowY = getStyle(document.body, 'overflowY');
          if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll')) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
          }
          document.body.style.overflow = 'hidden';
        }
      }
      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }
      dom.style.zIndex = PopupManager.nextZIndex();
      this.onOpen && this.onOpen();
      if (!this.transition) {
        this.doAfterOpen();
      }
    },
    doAfterOpen() {
      this._opening = false;
    },
    close() {
      if (this.willClose && !this.willClose()) return;
      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null; //释放openTimer
      }
      clearTimeout(this._closeTimer);
      const closeDelay = Number(this.closeDelay); //delay延迟
      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },
    doClose() {
      this._closing = true;
      this.onClose && this.onClose();
      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }
      this.opened = false;
      if (!this.transition) {
        this.doAfterClose();
      }
    },
    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
    }
  }
};
export {
  PopupManager
};
