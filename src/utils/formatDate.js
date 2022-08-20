import dayjs from "dayjs";

export function formatDate(date,formatStr="MM月DD日") {
  // console.log(date);
  return dayjs(date).format(formatStr);
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day");
}
