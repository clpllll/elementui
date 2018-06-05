export default function (instance, callback, speed = 300, once = false) {
  if (!instance || !callback) throw console.error('instance and callback is required');
  let called = false; //是否调用过函数
  const afterLeaveCallback = function () {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  }
  if (once) {
    instance.$once('after-leave', afterLeaveCallback);
  } else {
    instance.$on('after-leave', afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
  
}