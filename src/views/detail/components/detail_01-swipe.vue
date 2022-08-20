<template>
  <div class="swipe">
    <van-swipe
      class="swipe-list"
      :autoplay="3000"
      indicator-color="white"
      :height="200"
    >
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" />
        </van-swipe-item>
      </template>

      <!-- 具名插槽:找到插槽 -->
      <!-- 作用域插槽:将插槽内部的值传出去,为外部使用 -->
      <template #indicator="{ active, total }">
        <!-- <div class="indicator">
          {{ active }}/{{ swipeData.length }}-{{ total }}
        </div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
  const props = defineProps({
    swipeData: Array,
    default: () => [],
  });
  // console.log(props.swipeData);
  //很难的一个东西:整理数据 --将数据进行转换
  const swipeGroup = {};
  //思路一:
  for (const item of props.swipeData) {
    //{1:[],2:[],3:[]}
    swipeGroup[item.enumPictureCategory] = [];
  }
  for (const item of props.swipeData) {
    //valueArray=[]  //key:1
    //valueArray=[]  //key:2
    //valueArray=[]  //key:3
    const valueArray = swipeGroup[item.enumPictureCategory];
    //将item的数据放进去
    valueArray.push(item);
  }
  // console.log(swipeGroup);

  const nameReg = /【(.*?)】/i;
  function getName(name) {
    // return name.replace("：", "").replace("【", "").replace("】", "").replace("1");
    const results = nameReg.exec(name);
    let ex = 1 || 2 || 3 || 4 || 5;
    return results[1].replace(ex, "");
  }

  function getCategoryIndex(item) {
    const valueArray = swipeGroup[item.enumPictureCategory];
    return valueArray.findIndex((data) => data === item) + 1;
  }
</script>

<style lang="less" scoped>
  .swipe {
    .swipe-list {
      .item {
        img {
          width: 100%;
        }
      }
    }
    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);
      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
</style>
