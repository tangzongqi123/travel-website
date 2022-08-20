<template>
  <div class="detail top-page" ref="detailRef">
    <!-- 页面进度控制 -->
    <tab-control
      class="tabs"
      v-if="showTabControl"
      :titles="names"
      @tabItemClick="tabItemClick"
      ref="tabConrolRef"
    />
    <!-- 导航栏 -->
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="backClick"
    />

    <!-- 主要内容 -->
    <!--v-memo当数组中的值没有发生改变,就不会刷新  -->
    <div class="mian" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />

      <!-- 标题信息 -->
      <detail-infos
        name="描述"
        :top-infos="mainPart.topModule"
        :ref="getSectionRef"
      ></detail-infos>

      <!-- 房屋设施 -->
      <detail-facility
        name="设备"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
        :ref="getSectionRef"
      ></detail-facility>

      <!-- 房东介绍 -->
      <detail-landlord
        name="房东"
        :landlord="mainPart.dynamicModule.landlordModule"
        :ref="getSectionRef"
      ></detail-landlord>

      <!-- 热门评论 -->
      <detail-comment
        name="评论"
        :comment="mainPart.dynamicModule.commentModule"
        :ref="getSectionRef"
      ></detail-comment>

      <!-- 预定须知 -->
      <detail-notice
        name="须知"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
        :ref="getSectionRef"
      ></detail-notice>

      <!-- 地图周边 -->
      <detail-map
        name="地图"
        :position="mainPart.dynamicModule.positionModule"
        :ref="getSectionRef"
      />

      <!-- 价格说明 -->
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">小汤旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
  import TabControl from "@/components/tab-control/tab-control.vue";
  import DetailSwipe from "./components/detail_01-swipe.vue";
  import DetailInfos from "./components/detail_02-infos.vue";
  import DetailFacility from "./components/detail_03-facility.vue";
  import DetailLandlord from "./components/detail_04-landlord.vue";
  import DetailComment from "./components/detail_05-comment.vue";
  import DetailNotice from "./components/detail_06-notice.vue";
  import DetailMap from "./components/detail_07-map.vue";
  import DetailIntro from "./components/detail_08-intro.vue";

  import { onMounted, watch } from "vue";
  import { getDetail } from "@/service";
  import { ref, computed } from "@vue/reactivity";
  import { useRoute, useRouter } from "vue-router";
  import useSrcoll from "@/hooks/useScroll";

  //点击返回上一级路由
  const router = useRouter();
  function backClick() {
    router.back();
  }
  //获取houseid
  const route = useRoute();
  const houseId = route.params.id;

  //在页面管理数据:
  const detailInfos = ref({});
  //为什么要用computed?不用ref?
  const mainPart = computed(() => detailInfos.value.mainPart);
  // console.log(mainPart);
  //发送网络请求--获取数据
  getDetail(houseId).then((res) => {
    detailInfos.value = res.data;
    // console.log(detailInfos.value);
  });

  //tab-control
  const detailRef = ref();
  const { scrollTop } = useSrcoll(detailRef);
  //判断:如果>=300 就显示
  const showTabControl = computed(() => {
    return scrollTop.value >= 300;
  });

  //{描述:el,地图:el}
  const sectionEls = ref({});
  const names = computed(() => {
    return Object.keys(sectionEls.value);
  });
  const getSectionRef = (value) => {
    if (!value) return; //解决返回时,组件卸载,$el为null,下面会报错
    // value.$el能拿到所有对应元素
    //获取元素的name --> 描述,须知,地图..
    const name = value.$el.getAttribute("name");
    // console.log("--"); //一滚动会引起刷新,使用v-memo解决
    // console.log(name); //貌似不用设置为空数组也可以动态绑定
    // 对象动态添加key : 如果添加的属性为[],则可以先创建属性值为空数组
    sectionEls.value[name] = value.$el;
  };
  // onMounted(() => {
  //   console.log(sectionEls.value);
  // });
  //点击时,关闭滑动时对应的监听
  let isClick = false;
  let currentDistance = -1;
  function tabItemClick(index) {
    const key = Object.keys(sectionEls.value)[index];
    const el = sectionEls.value[key];
    let distance = el.offsetTop;
    if (index !== 0) {
      distance = distance - 44;
    }

    isClick = true;
    currentDistance = distance;

    //scrollTo :滑动
    detailRef.value.scrollTo({
      top: distance,
      behavior: "smooth",
    });
  }

  //实页面滚动,滚动时匹配对应的tabControl的index
  const tabConrolRef = ref();
  watch(scrollTop, (newValue) => {
    if (newValue === currentDistance) {
      isClick = false;
    }
    if (isClick) return;

    //1.获取所有区域的offsetTops
    const els = Object.values(sectionEls.value);
    const values = els.map((el) => el.offsetTop);

    //2.根据newValue去匹配想要的索引
    let index = values.length - 1;
    for (let i = 0; i < values.length; i++) {
      if (values[i] > newValue + 44) {
        index = i - 1;
        break;
      }
    }
    tabConrolRef.value?.setCurrentIndex(index);
  });
</script>

<style lang="less" scoped>
  .tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
</style>
