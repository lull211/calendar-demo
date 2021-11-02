var time1 = document.querySelector(".time1");
var time2 = document.querySelector(".time2").childNodes[0];
var time3 = document.querySelector(".time3");
var week = document.querySelector(".week");
var date = document.querySelector(".date");
var lis = date.getElementsByTagName('li');
var up = document.querySelector(".up");
var dowm = document.querySelector(".dowm");
document.getElementById
moment.locale("zh-cn");
function time() {
  time1.innerHTML = moment().format("LTS");
}
time();
setInterval(time, 1000);

//即时日期
var dayCn = window.calendar.solar2lunar(
  moment().year,
  moment().month() + 1,
  moment().day()
);
// console.log(dayCn);
time2.innerHTML =
  moment().format("LL") + "&nbsp;" + dayCn.IMonthCn + dayCn.IDayCn + " " + (dayCn.Term ? dayCn.Term : "");



//星期
var weekDay = moment.weekdaysMin(true);
weekDay.forEach((item) => {
  week.innerHTML += "<span>" + item + "</span>";
});

//获取某月的天数(最后一天)
function getEndDay(moment) {
  return moment.daysInMonth();
}

//获取某个月第一天的星期
function getFirstWeek(moment) {
  return moment.startOf("month").weekday();
}

//生成日历 date
var today = moment();
setDate(today); //默认传现在的日期

function setDate(m) {
  //传进来的moment要克隆了才能进行操作
  var lastEndDay = getEndDay(m.clone().subtract(1, "month")); //上个月最后一天
  var thisEndDay = getEndDay(m); //这个月最后一天
  var week = getFirstWeek(m.clone()); //这个月第一天的星期
  var str = ""; //放生成的结构
  var nextMonthStart = 0; //下个月的日期起始值

  for (var i = 0; i < 42; i++) {
    if (i < week) {
      //放上个月日期
      str =
        "<li class='color'>" +
        "<span>" +
        lastEndDay +
        "</span>" +
        "<span>"+getDayCn(m.year(),m.month(),lastEndDay) +"</span>" +
        "</li>" +
        str;
      lastEndDay--;
    } else if (i >= week + thisEndDay) {
      //下个月的日期
      nextMonthStart++;
      str +=
        "<li class='color'>" +
        "<span>" +
        nextMonthStart +
        "</span>" +
        "<span>" +
        getDayCn(m.year(), m.month()+2, nextMonthStart) +
        "</span>" +
        "</li>";
    } else {
      var cl = m.date() == i - week + 1 ? "color2" : "";

      if (m.year() != moment().year() || m.month() != moment().month()) {
        //非当前月份
        cl = "";
      }
      str +=
        "<li class=" +cl +">" +"<span>" +(i - week + 1) +"</span>" +"<span>" +getDayCn(m.year(), m.month() + 1, i - week + 1) +"</span>" +"</li>";
    }

  }
  time3.innerHTML = m.format("YYYY年MMM");
  date.innerHTML = str;
}
//上个月
up.onclick = function () {
  setDate(today.subtract(1, "month"));
};
dowm.onclick = function () {
  setDate(today.add(1, "month"));
};

function getDayCn(year, month, date) {
  var dayCn = window.calendar.solar2lunar(year, month, date);
  // console.log(dayCn);
  var result = "";
  if (dayCn.IDayCn == "初一") {
    result = dayCn.IMonthCn;
  } else if (dayCn.lunarFestival) {
    result = dayCn.lunarFestival;
  } else if (dayCn.festival) {
    result = dayCn.festival;
  } else if (dayCn.Term) {
    result = dayCn.Term;
  } else {
    result = dayCn.IDayCn;
  }
  return result;
}
console.log(getDayCn(2021, 6, 14));

//选项
lis = Array.prototype.slice.call(lis);
console.log(lis);
lis.forEach(item => {
  item.onclick = function () {
    if (item.className=='active') {
      item.className = '';
      
    }
    else {
      item.className += 'active';
    }
  }
});