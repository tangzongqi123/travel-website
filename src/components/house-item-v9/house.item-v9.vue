<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="name">{{ itemData.houseName }}</div>
        <div class="price">
          <!-- 评分 -->
          <!-- 显示小数点评分: readonly allow-half-->
          <van-rate
            :modelValue="Number(itemData.commentScore)"
            readonly
            allow-half
            color="#fff"
            size="15"
          />
          <div class="new">¥{{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    itemData: {
      type: Object,
      default: () => {},
    },
  });
</script>

<style lang="less" scoped>
  .house-item {
    width: 50%;

    .item-inner {
      position: relative;
      margin: 5px;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;

      .cover {
        img {
          width: 100%;
        }
      }

      .info {
        position: absolute;
        bottom: 0;
        padding: 8px 10px;
        color: #fff;

        .summary {
          font-size: 12px;
        }

        .name {
          margin: 5px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
      }
    }
  }
</style>
