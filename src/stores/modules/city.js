import { defineStore } from "pinia";
import { getCityAll } from "@/service/modules/city";
const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {},
    currentCity:{cityName:"成都"}
  }),
  actions: {
    async getAllCitiesData() {
      const res = await getCityAll();
      this.allCities = res.data;
    },
  },
});

export default useCityStore;
