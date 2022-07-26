var global = {
    aqi : {
        "优" : "#00FF00",
        "良" : "#11EE11",
        "轻度污染" : "#D5D52B",
        "中度污染" : "#D56F2B",
        "重度污染" : "#FF4040",
        "严重污染" : "#FF0000"
    }
}


//设置dom节点值
function setHtmlValue(domId,value){
	var d = document.getElementById(domId);
	d.innerHTML = value;
}
function setImgSrc(domId,src){
	var d = document.getElementById(domId);
	d.src=src;
}
function setBackGroundColor(domId,rgb){
	var d = document.getElementById(domId);
	d.style.backgroundColor= rgb;
}

function displayTime(){
	var date = document.getElementById("date");
	var ndate = document.getElementById("ndate");
	//var time = document.getElementById("time");
	var week = document.getElementById("week");
	var o = getCurrentDateTime();
	date.innerHTML = o.date;
	ndate.innerHTML = "农历：" + o.ndate;
	//time.innerHTML = o.time;
	week.innerHTML = o.week;

}
setInterval("displayTime()",1000 * 60 * 60);//1000为1秒钟


function getWeekPlus(flag) {
	var d = new Date();
	var week = d.getDay();
	if (flag == 1) {
		if (week == 6) {
			week = 0;
		} else {
			week += 1;
		}

	} else if (flag == 2) {
		if (week==5) {
			week = 0;
		} else if (week==6) {
			week = 1;
		} else {
			week += 2;
		}
	}
	var weekday = "";
	if (week == 0)
	weekday = "星期日";
	else if (week == 1)
	weekday = "星期一";
	else if (week == 2)
	weekday = "星期二";
	else if (week == 3)
	weekday = "星期三";
	else if (week == 4)
	weekday = "星期四";
	else if (week == 5)
	weekday = "星期五";
	else if (week == 6)
	weekday = "星期六";
	return weekday;
}

function getCurrentDateTime() {
var d = new Date();
var year = d.getFullYear();
var month = d.getMonth() + 1;
var date = d.getDate();
var week = d.getDay();

var currTime = "";
/*时分秒*/
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();
var ms = d.getMilliseconds();

var curDateTime = year;
if (month > 9)
curDateTime = curDateTime + "年" + month;
else
curDateTime = curDateTime + "年0" + month;
if (date > 9)
curDateTime = curDateTime + "月" + date + "日";
else
curDateTime = curDateTime + "月0" + date + "日";

if (hours > 9)
currTime = currTime + " " + hours;
else
currTime = currTime + " 0" + hours;
if (minutes > 9)
currTime = currTime + ":" + minutes;
else
currTime = currTime + ":0" + minutes;
if (seconds > 9)
currTime = currTime + " <span id='seconds'>" + seconds + "</span>";
else
currTime = currTime + " <span id='seconds'>0" + seconds + "</span>";

var weekday = "";
if (week == 0)
weekday = "星期日";
else if (week == 1)
weekday = "星期一";
else if (week == 2)
weekday = "星期二";
else if (week == 3)
weekday = "星期三";
else if (week == 4)
weekday = "星期四";
else if (week == 5)
weekday = "星期五";
else if (week == 6)
weekday = "星期六";

var o = new Object();
o.date = curDateTime;
o.ndate = showCal();
o.time = currTime;
o.week = weekday;
return o;
}


/*获取当前农历*/
function showCal(){
	return getLunar();
}



/**获取农历 start*/
function getLunar(){

	var nyear;
	var nmonth;
	var nday = -1;
	var nwday;
	var nhrs;
	var nmin;
	var nsec;

	var lmonth, lday, lleap; //农历参数

	function Draw() {
		NewTick();

		//显示时间
		var s = nyear + '年' + nmonth + '月' + nday + '日 ' + '星期' + cweekday(nwday) + ' ' + shapetime(nhrs, nmin, nsec);
		s += " 农历" + lmonth + "月" + lday; //农历
		var lunar_month_day=lmonth + "月" + lday;
		//需要展示在页面地方
		//alert(lunar_month_day);
		//console.log(lunar_month_day);
		return lunar_month_day;
	}


	function NewTick() {
		noww = new Date();
		if (noww.getDate() != nday) {
			nyear = noww.getFullYear();
			nmonth = noww.getMonth() + 1;
			nwday = noww.getDay();
			nday = noww.getDate();

			getlunar(); //获取农历
		}
		nhrs = noww.getHours();
		nmin = noww.getMinutes();
		nsec = noww.getSeconds();
	}


	//辅助函数
	var hzWeek = new Array("日", "一", "二", "三", "四", "五", "六", "日");
	function cweekday(wday) {
		return hzWeek[wday];
	}
	function shapetime(vhrs, vmin, vsec) {
		if (vsec <= 9) vsec = "0" + vsec;
		if (vmin <= 9) vmin = "0" + vmin;
		if (vhrs <= 9) vhrs = "0" + vhrs;
		return vhrs + ":" + vmin + ":" + vsec
	}

	//农历函数开始
	var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, //1990
		0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63);
	function lYearDays(y) {
		var i, sum = 348;
		for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
		return (sum + leapDays(y));
	}
	function leapDays(y) {
		if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
		else return (0);
	}
	function leapMonth(y) {
		return (lunarInfo[y - 1900] & 0xf);
	}
	function monthDays(y, m) {
		return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
	}
	function Lunar(y, m, d) {
		var i, leap = 0,
			temp = 0;
		var offset = (Date.UTC(y, m, d) - Date.UTC(1900, 0, 31)) / 86400000;
		for (i = 1900; i < 2050 && offset > 0; i++) {
			temp = lYearDays(i);
			offset -= temp;
		}
		if (offset < 0) {
			offset += temp;
			i--;
		}
		this.year = i;
		leap = leapMonth(i);
		this.isLeap = false;
		for (i = 1; i < 13 && offset > 0; i++) {
			if (leap > 0 && i == (leap + 1) && this.isLeap == false) {--i;
				this.isLeap = true;
				temp = leapDays(this.year);
			} else {
				temp = monthDays(this.year, i);
			}
			if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;
			offset -= temp;
		}
		if (offset == 0 && leap > 0 && i == leap + 1) if (this.isLeap) {
			this.isLeap = false;
		} else {
			this.isLeap = true; --i;
		}
		if (offset < 0) {
			offset += temp; --i;
		}
		this.month = i;
		this.day = offset + 1;
	}
	var nStr1 = new Array('', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二');
	var nStr2 = new Array('初', '十', '廿', '卅', '□');
	function GetcDay(d) {
		var s;
		switch (d) {
			case 10:
				s = '初十';
				break;
			case 20:
				s = '二十';
				break;
			case 30:
				s = '三十';
				break;
			default:
				s = nStr2[Math.floor(d / 10)];
				s += nStr1[d % 10];
				break;
		}
		return (s);
	}
	function GetcMon(m) {
		if (m == 1) return '正';
		else return nStr1[m];
	}
	function getlunar() {
		var lObj = new Lunar(nyear, nmonth - 1, nday);
		lmonth = GetcMon(lObj.month);
		lday = GetcDay(lObj.day);
		lleap = lObj.isLeap;
		if (lleap == 1) {
			lmonth = "闰" + lmonth;
		}
	}
	//农历函数结束
	return Draw();
}
/**获取农历 end*/






//-------------------------chart   js-----------------------------

function getOption(arr,now) {
		var xAxisData = [];
		var seriesData = [];

        if (now) {
            xAxisData.push("现在");
            seriesData.push(now.tmp.split("℃")[0]);
        }

		if (arr != null && arr.length>0) {
			for (var i = 0; i < arr.length; i++) {
				var date = arr[i].day;
				xAxisData.push(date);
				var temp = arr[i].tem;
				seriesData.push(temp.split("℃")[0]);
			}
		}
			// 指定图表的配置项和数据
			var option = {
				title : {
					text : '温度预测',
					textStyle : {
						fontSize : 15
					}
				},
				legend : {
					data : ['气温']
				},
				tooltip: {
					trigger: 'axis'
				},
				grid : {
					top : 30,
					bottom : 30
				},
				xAxis: {
					type : 'category',
					boundaryGap : false,
					data:xAxisData
				},
				yAxis: {
					type : 'value',
					scale : true,
					splitNumber : 3
				},
				series: [{
					name: '气温',
					type: 'line',
					smooth : true,
					data: seriesData.length>0?seriesData:[0],
					label: {
						normal: {
							show: true,
							position: 'top',
							formatter : '{c}℃'
						}
					},
				}]
			};
	return option;

}


	 // 基于准备好的dom，初始化echarts实例
   var myChart = echarts.init(document.getElementById('main'),'dark');
   // 使用刚指定的配置项和数据显示图表。
   //myChart.setOption(getOption(aaa),true);


/**
 * 设置实时天气质量
 */
function setWeatherQua() {
	$.ajax({
		type: 'GET',
		async: false,
		url: "https://www.tianqiapi.com/api/?version=v6&cityid=tianjin&appid=52391847&appsecret=KRxZ9ijE",
		dataType: 'json',
		success: function(data) {
			//设置实时温度
			setHtmlValue("currTmp",data.tem);
			setHtmlValue("currWeather",data.wea);
			//设置实时空气质量
			setHtmlValue("air",data.air_pm25 + " " + data.air_level);
			setBackGroundColor("air",global.aqi[data.air_level]);
		}
	});
}

/**
 * 设置天气数据
 * @param str
 * @param city
 */
function setWeatherData() {

	$.ajax({
		type: 'GET',
		async: false,
		url: "https://www.tianqiapi.com/api/?version=v1&cityid=tianjin&appid=52391847&appsecret=KRxZ9ijE",
		dataType: 'json',
		success: function(data) {

			setHtmlValue("city",data.city);
			//var o = JSON.parse(str);

			//设置今天天气
			setWeather(null,null,"today_img","today_temp","today_cond","today_wind",data.data[0]);
			//设置今天的气温曲线
			var option = getOption(data.data[0].hours);
			myChart.setOption(option,false);

			//设置明天天气
			setWeather("tomo_week",1,"tomo_img","tomo_temp","tomo_cond","tomo_wind",data.data[1]);

			//设置后天天气
			setWeather("aftomo_week",2,"aftomo_img","aftomo_temp","aftomo_cond","aftomo_wind",data.data[2]);

		}
	});

}

/**
 * 设置天气
 * @param weekDom
 * @param imgDom
 * @param tempDon
 * @param condDom
 */
function setWeather(weekDom,weekValue,imgDom,tempDom,condDom,windDom,dayData){
	if (weekDom && weekValue) {
		setHtmlValue(weekDom,getWeekPlus(weekValue));
	}
	setImgSrc(imgDom,"../../static/weatherImg/sogou/" + dayData.wea_img + ".png");
	setHtmlValue(tempDom,dayData.tem2 + "-" + dayData.tem1);

	setHtmlValue(condDom,dayData.wea);

	var wind = dayData.win;
	var winStr = "";
	if (wind[0] == wind[1]) {
		winStr = wind[0];
	} else {
		winStr = wind[0] + "转" + wind[1];
	}
	setHtmlValue(windDom,winStr);

	var level = dayData.win_speed;
	if (level.indexOf("转") > -1) {
		level = level.split("转")[0];
	}
	setHtmlValue(windDom,winStr + level);
}

function init() {
	setWeatherData();
	setWeatherQua();
	displayTime();
}

setInterval("init()",10 * 60 * 1000);//1000为1秒钟