<template>
  <div class="home-search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="getPosition">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendarClick">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>

      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <!-- <van-cell title="选择单个日期" :value="date" @click="show = true" /> -->
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>
  </div>

  <!-- 热门建议 -->
  <div class="section hot-suggests">
    <template v-for="(item, index) in hotSuggests" :key="index">
      <div
        class="item"
        :style="{
          background: item.tagText.background.color,
          color: item.tagText.color,
        }"
      >
        {{ item.tagText.text }}
      </div>
    </template>
  </div>

  <!--开始搜索  -->
  <div class="section search-btn">
    <div class="btn" @click="searchBtnClick">开始搜索</div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import useCityStore from "@/stores/modules/city";
  import useHomeStore from "@/stores/modules/home";
  import { formatDate, getDiffDays } from "@/utils/formatDate";
  import useMainStore from "@/stores/modules/main";

  const router = useRouter();

  function cityClick() {
    router.push("/city");
  }
  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log(res, "获取位置成功");
      },
      (err) => {
        console.log(err, "获取位置失败");
      }
    );
  }

  //日历的处理
  let showCalendar = ref(false);
  function showCalendarClick() {
    showCalendar.value = true;
  }

  //数据回显:城市
  const cityStore = useCityStore();
  let { currentCity } = storeToRefs(cityStore);

  // const startDate = ref(formatDate(nowDate));
  // const endDate = ref(formatDate(newDate));
  // const stayCount = ref(getDiffDays(nowDate, newDate));

  //日期范围的处理
  const mainStore = useMainStore();
  const { startDate, endDate } = storeToRefs(mainStore);

  //数据回显:日期以及停留时间
  const startDateStr = computed(() => formatDate(startDate.value));
  const endDateStr = computed(() => formatDate(endDate.value));
  const stayCount = ref(getDiffDays(startDate.value, endDate.value));

  // console.log(startDateStr, endDateStr);
  function onConfirm(value) {
    // console.log(value);
    const selectStartDate = value[0];
    const selectEndDate = value[1];
    // console.log(value);
    //1.将获取到的日历设置到当前日历上
    mainStore.startDate = selectStartDate;
    mainStore.endDate = selectEndDate;
    stayCount.value = getDiffDays(selectStartDate, selectEndDate);

    //2.隐藏日历
    showCalendar.value = false;
  }

  //热门城市建议:
  const homeStore = useHomeStore();

  const { hotSuggests } = storeToRefs(homeStore);

  //开始搜索点击事件
  function searchBtnClick() {
    router.push({
      path: "/search",
      query: {
        startDate: formatDate(startDate.value, "MM-DD"),
        endDate: formatDate(endDate.value, "MM-DD"),
        currentCity: currentCity.value.cityName,
      },
    });
  }
</script>

<style lang="less" scoped>
  .home-search-box {
    --van-calendar-popup-height: 100%;
  }
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
      color: #333;
      font-size: 14px;
    }
    .position {
      width: 74px;
      display: flex;
      align-items: center;
    }
    .text {
      position: relative;

      font-size: 12px;
    }
    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
  .price-counter {
    .start {
      border-right: 1px solid var(--line-color);
    }
  }
  .hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
      padding: 4px 8px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
      line-height: 1;
    }
  }
  .search-btn {
    .btn {
      width: 342px;
      height: 38px;
      max-height: 50px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
  }
</style>
