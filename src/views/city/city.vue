<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      <!-- <city-group :group-data="currentGroup"></city-group> -->
      <template v-for="(value, key) in allCities" :key="key">
        <!-- 同时拿到2个数据,做隐藏和显示,就不用重新渲染元素,元素很多,加载很慢 -->
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
  import CityGroup from "./components/city-group.vue";
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import useCityStore from "@/stores/modules/city";

  const router = useRouter();

  //搜索框功能
  const searchValue = ref("");
  function cancelClick() {
    router.back();
  }

  //tab切换功能
  let tabActive = ref();

  //网络请求:请求城市的数据
  // getCityAll().then((res) => {
  //   console.log(res);
  // });
  //弊端:如果子组件也需要数据,就又会发送网络请求,或者通过props传递过去
  //如果统一交给pinia管理,就不需要多次发送网络请求或者传递数据了

  //从Store中获取数据
  const cityStore = useCityStore();
  cityStore.getAllCitiesData();
  const { allCities } = storeToRefs(cityStore);

  //目的:获取选中标签后的数据
  //1.获取正确的key:将tabs中绑定的tabActive正确绑定
  //2.根据key,从allCities获取数据 ,默认直接获取的数据不是响应式的
  //所以必须要包裹computed6
  const currentGroup = computed(() => allCities.value[tabActive.value]);
  onMounted(() => {
    console.log(currentGroup.value);
  });
</script>

<style lang="less" scoped>
  .city {
    .top {
      position: relative;
      z-index: 9;
    }
    .content {
      height: calc(100vh - 98px);
      overflow-y: auto;
    }
  }
</style>
