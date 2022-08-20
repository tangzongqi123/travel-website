import myRequest from "../request/index";

export function getHomeHotSuggests() {
  return myRequest.get({
    url: "/home/hotSuggests",
  });
}

export function getHomeCategories() {
  return myRequest.get({
    url: "/home/categories",
  });
}

//currentPage 页面数据参数
export function getHouseList(currentPage) {
  return myRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
