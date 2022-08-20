import { defineStore } from "pinia";
import {
  getHomeHotSuggests,
  getHomeCategories,
  getHouseList,
} from "@/service/modules/home";
const useHomeStore = defineStore("home", {
  state: () => ({
    //初始化热门搜索
    hotSuggests: [],
    //初始化种类
    categories: [],
    //初始化房屋列表
    houseList: [],
    //初始化 page参数
    currentPage: 1,
  }),
  actions: {
    //初始化的值 == 将获取到的值:
    async getHomeHotSuggestsData() {
      const res = await getHomeHotSuggests();

      this.hotSuggests = res.data;
    },
    async getHomeHotCategoriesData() {
      const res = await getHomeCategories();
      this.categories = res.data;
    },
    async getHomehouseListData() {
      // console.log("1");
      const res = await getHouseList(this.currentPage);
      console.log(res.data);
      //将每次的数据追加到数组末尾
      this.houseList.push(...res.data);
      //每次调用,page+1
      this.currentPage++;
    },
  },
});

export default useHomeStore;
