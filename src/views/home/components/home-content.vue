<template>
  <div class="content">
    <h3 class="title">热门精选</h3>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="index">
        <!-- 根据服务器数据类型分为2个组件 -->
        <house-item-v9
          v-if="item.discoveryContentType === 9"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></house-item-v9>

        <house-item-v3
          v-if="item.discoveryContentType === 3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        ></house-item-v3>
      </template>
    </div>
  </div>
</template>

<script setup>
  import HouseItemV3 from "@/components/house-item-v3/house.item-v3.vue";
  import HouseItemV9 from "@/components/house-item-v9/house.item-v9.vue";
  import useHomeStore from "@/stores/modules/home";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  const homeStore = useHomeStore();
  const { houseList } = storeToRefs(homeStore);
  const router = useRouter();
  function itemClick(data) {
    // console.log("itemClick");
    // console.log(data.houseId);

    //动态路由:
    router.push({
      path: `/detail/${data.houseId}`,
      // query: { houseId: data.houseId },
    });
    // router.push("/detail");
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 10px 8px;
    .title {
      font-size: 22px;
      padding: 10px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
