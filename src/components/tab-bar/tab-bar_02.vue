<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabBarData" :key="index">
        <!-- 测试修改incon的样式 -->
        <!-- <van-tabbar-item icon="home-o">  -->
          <!-- to:点击后跳转的目标路由对象 -->
        <van-tabbar-item :to="item.path">
          <!-- 默认插槽 -->
          <template #default>
            <span>{{ item.text }}</span>
          </template>

          <!-- icon插槽 -->
          <template #icon>
            <img
              v-if="currentIndex === index"
              :src="getAssetURL(item.imageActive)"
            />
            <img v-else :src="getAssetURL(item.image)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
  import tabBarData from "@/assets/local-data/tab-bar";
  import { getAssetURL } from "@/utils/load_assets";
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  let currentIndex = ref(0);

  function btnClick(index, item) {
    currentIndex.value = index;
    router.push(item.path);
  }
</script>

<style lang="less" scoped>
  //重要:修改组件库的CSS样式
  .tab-bar {
    // 1.1定义全局的的一个变量,对全局都生效
    // 1.2局部定义一个变量: 只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px !important;

    // .van-tabbar-item {
    // font-size: var(--van-tabbar-item-font-size);
    // }

    //2.修改其他组件的CSS样式 需要使用:deep
    // :deep(.van-tabbar-item__icon) {
    //   font-size: 28px;
    // }

    //3.如果是在插槽中添加的元素,可以直接在当前页面修改样式
    img {
      height: 28px;
    }
  }
</style>
