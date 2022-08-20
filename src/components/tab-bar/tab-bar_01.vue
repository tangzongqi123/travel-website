<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabBarData" :key="index">
      <div
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="btnClick(index, item)"
      >
        <template v-if="currentIndex === index">
          <img :src="getAssetURL(item.imageActive)" />
        </template>
        <template v-else>
          <img :src="getAssetURL(item.image)" />
        </template>
        <span>{{ item.text }}</span>
      </div>
    </template>
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
  .tab-bar {
    // width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #f3f3f3;

    .tab-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      // -----------------困惑1:
      &.active {
        color: var(--primary-color);
      }
    }

    img {
      width: 36px;
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
</style>
