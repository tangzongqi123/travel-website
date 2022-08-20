import myRequset from "../request/index";

export function getCityAll() {
  return myRequset.get({
    url: "/city/all",
  });
}
