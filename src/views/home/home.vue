<template>
  <div class="home" ref="homeRef">
    <!-- 标题 -->
    <home-nav-bar></home-nav-bar>
    <!-- 首图 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>

    <!-- 位置+入住离店时间+相关信息+热门区域+搜索框-->
    <home-search-box></home-search-box>

    <!-- 分类  -->
    <home-categories></home-categories>

    <div v-if="isShow" class="search-bar">
      <search-bar></search-bar>
    </div>

    <!-- 商品列表 -->
    <home-content></home-content>

    <!-- <button @click="loadMoreClick">加载更多</button> -->
  </div>
</template>

<script>
  export default {
    name: "home",
  };
</script>
<script setup>
  import HomeNavBar from "./components/home-nav-bar.vue";
  import HomeSearchBox from "./components/home-search-box.vue";
  import HomeCategories from "./components/home-categories.vue";
  import HomeContent from "./components/home-content.vue";
  import SearchBar from "@/components/search-bar/search-bar.vue";
  import { watch, ref, computed, onActivated } from "vue";
  import useHomeStore from "@/stores/modules/home";
  import useScroll from "@/hooks/useScroll";

  const homeStore = useHomeStore();
  homeStore.getHomeHotSuggestsData();
  homeStore.getHomeHotCategoriesData();
  homeStore.getHomehouseListData();

  //方法一:回调函数,其内部到达底部会传入一个回调函数
  // useStore(()=>{homeStore.getHomehouseListData});

  //方法二:hooks中返回了一个变量来判断是否达到 了底部
  const homeRef = ref();
  const { isReachBottom, scrollTop } = useScroll(homeRef);
  //疑问:为啥子这里就是ref嘞?
  //const {isReachBottom}={isReachBottom} isReachBottom-->ref()
  //const isReachBottom=ref()
  //vuex pinia会失去响应式,个人理解为它们的数据本来是响应式,但可能不是ref对象,进行赋值后就会失去响应式 ,
  // console.log(homeStore.categories); //Proxy代理对象 差不多是这样的

  //监听函数watch的实际应用:
  //当一个值发生改变,不仅可以拿到改变前的值,也可以拿到改变后的值,还可以在回调函数中进行逻辑操作
  watch(isReachBottom, (newValue) => {
    //如果数据发生了变化,进行获取数据
    if (newValue) {
      homeStore.getHomehouseListData().then(() => {
        //拿到了新的数据,此时不再到达底部
        isReachBottom.value = false;
      });
    }
  });
  //搜索框的控制:
  //watch的实际使用2:
  // const isShow = ref(false);
  // watch(scrollTop, (newValue) => {
  //     if (scrollTop.value > 100) {
  //       isShow.value = true;
  //   }
  // });
  //computed的实际使用:
  const isShow = computed(() => {
    return scrollTop.value > 360; //会收集依赖,依赖的值发生变化,computed返回的值也会变化
  });

  // 跳转回home时, 保留原来的位置
  onActivated(() => {
    homeRef.value?.scrollTo({
      top: scrollTop.value,
    });
  });
  //点击加载更多
  // function loadMoreClick() {
  //   console.log("加载更多");
  //   homeStore.getHomehouseListData();
  // }

  //监听窗口滑动
  //1.当我们离开页面时,我们移除监听
  //2.如果别的页面也进行类似的监听,会编写重复的代码,需要进行hooks抽取
  // const scrollCallBack = () => {
  //   const scrollTop = document.documentElement.scrollTop;
  //   const cientHeight = document.documentElement.clientHeight;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   // console.log(cientHeight, scrollTop, scrollHeight);
  //   if (cientHeight + scrollTop + 1 >= scrollHeight) {
  //     homeStore.getHomehouseListData();
  //   }
  // };
  // //挂载后再进行监听
  // onMounted(() => {
  //   window.addEventListener("scroll", scrollCallBack);
  // });
  // //销毁后,移除监听
  // onUnmounted(() => {
  //   window.removeEventListener("scroll", scrollCallBack);
  // });
</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 60px;
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .banner {
    img {
      margin-top: 10px;
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
</style>
