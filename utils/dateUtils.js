import moment from "moment";

moment.updateLocale("vi", {
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
  calendar: {
    lastDay: "LT [hôm qua]",
    sameDay: "[Hôm nay lúc] LT",
    nextDay: "[Ngày mai lúc] LT",
    lastWeek: "dddd [tuần trước lúc] LT",
    nextWeek: "dddd [tuần tới lúc] LT",
    sameElse: "L",
  },
  meridiem: (hours) => {
    if (hours < 12) return "sáng";
    if (hours < 18) return "chiều";
    return "tối";
  },
  weekdays: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "DD/MM/YYYY",
    l: "D/M/YYYY",
    LL: "MMMM Do YYYY",
    ll: "MMM D YYYY",
    LLL: "MMMM Do YYYY LT",
    lll: "MMM D YYYY LT",
    LLLL: "dddd, MMMM Do YYYY LT",
    llll: "ddd, MMM D YYYY LT",
  },
});

const formatCalendar = (date) => {
  return moment(new Date(date)).locale("vi").calendar();
};

const formatFromNow = (date) => {
  return moment(new Date(date)).locale("vi").fromNow();
};

export { formatCalendar, formatFromNow };
