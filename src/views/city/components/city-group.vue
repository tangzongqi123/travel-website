<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="cityIndexList">
      <van-index-anchor index="热门" />
      <div class="hot-list">
        <template v-for="(city, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indez) in group.cities" :key="indez">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
  import { defineProps, computed } from "vue";
  import useCityStore from "@/stores/modules/city";
  import { useRouter } from "vue-router";
  //1.接收数据
  const props = defineProps({
    groupData: {
      type: Object,
      default: () => {},
    },
  });

  //2.定义右侧索引列表--从服务器中获取到真实的索引列表,同时自定义添加一个索引
  //因为,默认组件的右侧列表是和每一个<van-index-anchor />一一对应的
  const cityIndexList = computed(() => {
    const list = props.groupData.cities.map((item) => item.group);
    list.unshift("#");
    return list;
  });
  // console.log(props.groupData);

  //3.数据回显功能:
  //将当前点击的城市对象数据,设置到pinia状态中
  let cityStore = useCityStore();
  const router = useRouter();
  function cityClick(city) {
    // console.log(city);
    cityStore.currentCity = city;

    //返回上一级
    router.back();
  }
</script>

<style lang="less" scoped>
  .hot-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 25px;
    .city {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      text-align: center;
      line-height: 28px;
      background-color: #fff4ec;
      margin: 6px 0;
    }
  }
</style>
