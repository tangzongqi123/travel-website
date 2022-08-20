<template>
  <div class="dropdown">
    <van-dropdown-menu>
      <template v-for="(item, index) in itemsData">
        <!-- 1.位置 -->
        <van-dropdown-item
          v-if="item.gType === 2"
          title="位置"
          :ref="dropdownItemRefs"
        >
          <div class="dropdown-bar-panel-content">
            <side-bar
              class="top"
              :menuData="item.subGroups"
              @item-click="handleSideSubItemClick"
            >
            </side-bar>

            <view-house-btns
              class="bottom"
              @clear="handleClearClick('位置')"
              @view-click="handleViewClick('位置')"
            >
            </view-house-btns>
          </div>
        </van-dropdown-item>
        <!-- 2.欢迎度排序 -->
        <van-dropdown-item
          v-if="item.gType === 4"
          v-model="value"
          :options="options"
        />
        <!-- 筛选 -->
        <van-dropdown-item
          v-if="item.gType === 1"
          title="筛选"
          :ref="dropdownItemRefs"
        >
          <div class="dropdown-bar-panel-content">
            <side-bar class="top" :menuData="item.subGroups">
              <template #content="slotProps">
                <p class="list-content">正在开发中....</p>
              </template>
            </side-bar>
            <view-house-btns
              class="bottom"
              @clear="handleClearClick('筛选')"
              @view-click="handleViewClick('筛选')"
            ></view-house-btns>
          </div>
        </van-dropdown-item>
      </template>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
  import SideBar from "../side-bar/index.vue";
  import ViewHouseBtns from "../view-house-btns/index.vue";
  import { ref } from "vue";

  defineProps({
    itemsData: {
      type: Array,
      default: () => [],
    },
  });

  // // dropdown
  const item = ref(null);
  const value = ref(0);
  const options = [
    { text: "欢迎度排序", value: 0 },
    { text: "好评优先", value: 1 },
    { text: "点评数多->少", value: 2 },
    { text: "低价优先", value: 3 },
    { text: "高价优先", value: 4 },
  ];
  const dropdownRefs = {};

  const onConfirm = () => {
    item.value.toggle();
  };

  const dropdownItemRefs = (el) => {
    if (el) {
      dropdownRefs[el.title] = el;
    }
  };
  const handleClearClick = (title) => {
    dropdownRefs[title]?.toggle();
  };
  const handleViewClick = (title) => {
    dropdownRefs[title]?.toggle();
  };
  const handleSideSubItemClick = (item) => {
    console.log(item);
  };
</script>

<style lang="less" scoped></style>
