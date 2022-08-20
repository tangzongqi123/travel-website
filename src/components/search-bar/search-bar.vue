<template>
  <div class="search">
    <div v-if="currentCity" class="left">
      <slot name="left">
        <span>{{ currentCity }}</span>
      </slot>
    </div>

    <div class="select-time">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>

      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>

    <div class="content ellipsis-text-1" @click="handleSearchClick">
      <div class="keyword">{{ keyWord }}</div>
      <i
        class="icon-cancel"
        v-if="cancelIcon"
        @click.stop="handleCancelClick"
      ></i>
    </div>

    <div class="right">
      <i class="icon-search" v-if="searchIcon"></i>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import useMainStore from "@/stores/modules/main";
  import { formatDate } from "@/utils/formatDate";
  import { storeToRefs } from "pinia";

  const props = defineProps({
    currentCity: {
      type: String,
      default: "",
    },
    startDate: {
      type: String,
      default: "00.00",
    },
    endDate: {
      type: String,
      default: "00.00",
    },
    height: {
      type: String,
      default: "35px", // 35px  45px
    },
    keyWord: {
      type: String,
      default: "关键字/位置/名宿名",
    },
    keyWordFontSize: {
      type: String,
      default: "12px",
    },
    searchIcon: {
      type: Boolean,
      default: false,
    },
    cancelIcon: {
      type: Boolean,
      default: false,
    },
  });
  const mainStore = useMainStore();
  const { startDate, endDate } = storeToRefs(mainStore);
  const startDateStr = computed(() => formatDate(startDate.value, "MM.DD"));
  const endDateStr = computed(() => formatDate(endDate.value, "MM.DD"));

  const emit = defineEmits(["cancelClick", "searchClick"]);
  const handleSearchClick = () => {
    emit("searchClick");
  };
  const handleCancelClick = () => {
    emit("cancelClick");
  };
</script>

<style lang="less" scoped>
  // 重写Vant 样式
  :global(.van-nav-bar .van-nav-bar__content .van-nav-bar__title) {
    width: 73%;
    max-width: 100%;
  }
  .search {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 45px;
    line-height: 45px;

    padding: 0 10px;
    font-size: 14px;
    color: #999;

    border-radius: 6px;
    background: #f2f4f6;

    .left {
      // max-width: 80px;

      font-weight: 500;
      min-width: 30px;
      font-size: 14px;
      padding-right: 6px;
      margin-right: 5px;
      border-right: 1px solid #fff;
      color: #333;
      white-space: nowrap;
    }

    .select-time {
      display: flex;
      flex-direction: column;

      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: normal;
        font-size: 10px;
        .name {
          font-size: 10px;
        }

        .date {
          position: relative;
          color: #333;
          margin: 0 10px 0 3px;
          font-weight: 500;
        }
      }

      .end .date::after {
        content: " ";
        width: 0;
        height: 0;
        border: 4px solid #666;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        bottom: 0px;
        right: -12px;
      }
    }

    .content {
      position: relative;
      flex: 1;
      padding: 0 6px;
      text-align: left;
      border-left: 1px solid #fff;

      .keyword {
        max-width: 155px;
        width: 120px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .icon-cancel {
        position: absolute;
        top: 30%;
        right: 0;
        display: inline-block;
        background-image: url(../../assets/img/sprite.png);
        background-position: -92px -58.5px;
        width: 14.5px;
        height: 15px;
        background-size: 125px 110px;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }

    .icon-search {
      width: 24px;
      height: 24px;
      display: inline-block;

      background-image: url(../../assets/img/home/home-sprite.png);
      background-position: -29px -151px;
      background-size: 207px 192px;
    }
  }
</style>
