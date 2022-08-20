import myRequset from "../request/index";

export function getDetail(houseId) {
  return myRequset.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
