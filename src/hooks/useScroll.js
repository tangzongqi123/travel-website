import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";
export default function useSrcoll(elRef) {
  //默认为监听页面的滚动
  let el = window;

  //判断是否到达的了底部
  const isReachBottom = ref(false);

  const scrollTop = ref(0);
  const cientHeight = ref(0);
  const scrollHeight = ref(0);

  //防抖的使用:
  const scrollCallBack = throttle(() => {
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop;
      cientHeight.value = document.documentElement.clientHeight;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      scrollTop.value = el.scrollTop;
      cientHeight.value = el.clientHeight;
      scrollHeight.value = el.scrollHeight;
    }

    // console.log("滑动");
    if (cientHeight.value + scrollTop.value + 1 >= scrollHeight.value) {
      //回调函数的方案:此时可以执行传入的回调函数
      //到达底部为true
      isReachBottom.value = true;
    }
  }, 100);

  //挂载后再进行监听
  onMounted(() => {
    if (elRef) {
      el = elRef.value;
    }
    el.addEventListener("scroll", scrollCallBack);
  });
  //销毁后,移除监听
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollCallBack);
  });

  //返回变量,供外面使用
  return { isReachBottom, scrollTop, cientHeight, scrollHeight };
}
