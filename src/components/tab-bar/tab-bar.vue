<template>
  <div class="tab-bar">
    <!-- route:开启路由模式 -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData" :key="index">
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
  import { ref, watch } from "vue";
  import { useRouter, useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute();
  watch(route, (newValue) => {
    // console.log(route.path); //  /home
    //在我们的local-data的数组中,每一个对象都有一个path:'/home'..
    //返回数组中findIndex 足提供的测试函数的第一个元素的索引
    const index=tabBarData.findIndex(item=>item.path === route.path)
    if(index === -1) return 
    currentIndex.value=index

  });
  let currentIndex = ref(0);

  function btnClick(index, item) {
    currentIndex.value = index;
    router.push(item.path);
  }
</script>

<style lang="less" scoped>
  .tab-bar {
    //3.如果是在插槽中添加的元素,可以直接在当前页面修改样式
    img {
      height: 28px;
    }
  }
</style>
