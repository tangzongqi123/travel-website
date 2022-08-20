import myRequest from "../request/index";

export function getFavorList() {
  return myRequest.get({
    url: "/favor/list",
  });
}

export function getHistoryList() {
  return myRequest.get({
    url: "/favor/history",
  });
}
