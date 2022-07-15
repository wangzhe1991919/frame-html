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
	var time = document.getElementById("time");
	var week = document.getElementById("week");

	console.log(calendar);

	now = new Date();

	date.innerHTML = calendar.gregorianYear + "年" + calendar.gregorianMonth + "月" + calendar.gregorianDay + "日";
	ndate.innerHTML = "农历：" + calendar.lunarMonthCn + calendar.lunarDayCn;
	//刷新时间
	time.innerHTML = calendar.hours + ":" + calendar.minutes + " <span id='seconds'>" + calendar.seconds + "</span>";
	week.innerHTML = calendar.weekday;

}
setInterval("displayTime()",1000);//1000为1秒钟


/*function getWeekPlus(flag) {
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
/!*时分秒*!/
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
o.ndate = calendar;
o.time = currTime;
o.week = weekday;
return o;
}*/





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
	setImgSrc(imgDom,"../static/weatherImg/sogou/" + dayData.wea_img + ".png");
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
}

setInterval("init()",10 * 60 * 1000);//1000为1秒钟