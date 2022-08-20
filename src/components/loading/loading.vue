<template>
  <div class="loading" v-if="mainStore.isLoading">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
  import useMainStore from "@/stores/modules/main";

  const mainStore = useMainStore();
</script>

<style lang="less" scoped>
  .loading {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.2);
    .bg {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 104px;
      height: 104px;
      // 后面的属性什么意思?
      //background-img  background-postition挨着background-size需要加/
      //不然就是  background-postition的4个属性了
      background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 8px;
      }
    }
  }
</style>
