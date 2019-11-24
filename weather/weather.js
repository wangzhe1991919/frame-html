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
	var o = getCurrentDateTime();
	date.innerHTML = o.date;
	ndate.innerHTML = "农历：" + o.ndate;
	time.innerHTML = o.time;
	week.innerHTML = o.week;

}
setInterval("displayTime()",1000);//1000为1秒钟


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
var D=new Date();
var yy=D.getFullYear();
var mm=D.getMonth()+1;
var dd=D.getDate();
var ww=D.getDay();
var ss=parseInt(D.getTime() / 1000);
if (yy<100) yy="19"+yy;
return GetLunarDay(yy,mm,dd);
}

//定义全局变量
var CalendarData=new Array(100);
var madd=new Array(12);
var tgString="甲乙丙丁戊己庚辛壬癸";
var dzString="子丑寅卯辰巳午未申酉戌亥";
var numString="一二三四五六七八九十";
var monString="正二三四五六七八九十冬腊";
var weekString="日一二三四五六";
var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear,cMonth,cDay,TheDate;
CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);
madd[0]=0;
madd[1]=31;
madd[2]=59;
madd[3]=90;
madd[4]=120;
madd[5]=151;
madd[6]=181;
madd[7]=212;
madd[8]=243;
madd[9]=273;
madd[10]=304;
madd[11]=334;

function GetBit(m,n){
return (m>>n)&1;
}
//农历转换
function e2c(){
TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);
var total,m,n,k;
var isEnd=false;
var tmp=TheDate.getYear();
if(tmp<1900){
tmp+=1900;
}
total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;

if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
total++;
}
for(m=0;;m++){
k=(CalendarData[m]<0xfff)?11:12;
for(n=k;n>=0;n--){
if(total<=29+GetBit(CalendarData[m],n)){
isEnd=true; break;
}
total=total-29-GetBit(CalendarData[m],n);
}
if(isEnd) break;
}
cYear=1921 + m;
cMonth=k-n+1;
cDay=total;
if(k==12){
if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
cMonth=1-cMonth;
}
if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
cMonth--;
}
}
}

function GetcDateString(){
var tmp="";
/*显示农历年：（ 如：甲午(马)年 ）*/
/*tmp+=tgString.charAt((cYear-4)%10);
tmp+=dzString.charAt((cYear-4)%12);
tmp+="(";
tmp+=sx.charAt((cYear-4)%12);
tmp+=")年 ";*/
if(cMonth<1){
tmp+="(闰)";
tmp+=monString.charAt(-cMonth-1);
}else{
tmp+=monString.charAt(cMonth-1);
}
tmp+="月";
tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));
if (cDay%10!=0||cDay==10){
tmp+=numString.charAt((cDay-1)%10);
}
return tmp;
}

function GetLunarDay(solarYear,solarMonth,solarDay){
//solarYear = solarYear<1900?(1900+solarYear):solarYear;
if(solarYear<1921 || solarYear>2020){
return "";
}else{
solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;
e2c(solarYear,solarMonth,solarDay);
return GetcDateString();
}
}









//-------------------------chart   js-----------------------------

function getOption(arr,now) {
		var xAxisData = [];
		var seriesData = [];

        if (now) {
            xAxisData.push("现在");
            seriesData.push(now.tmp);
        }

		if (arr != null && arr.length>0) {
			for (var i = 0; i < arr.length; i++) {
				var date = arr[i].date;
				date = date.split(" ")[1];
				xAxisData.push(date);
				seriesData.push(arr[i].tmp);
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
					data:xAxisData.length>0?xAxisData:["0"]
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
 * 设置天气质量
 */
function setWeatherQua() {



	$.ajax({
		type: 'GET',
		async: false,
		url: "https://free-api.heweather.net/s6/air/now?location=tianjin&key=e0377a2128f940f5a943cd187c18c5c4",
		dataType: 'json',
		success: function(data) {

			var o = data.HeWeather6[0];
			var now = o.air_now_city;

			//设置实时空气质量
			setHtmlValue("air",now.pm25 + " " + now.qlty);
			setBackGroundColor("air",global.aqi[now.qlty]);

		}
	});

}

/**
 * 设置未来几小时的气温数据
 */
function setTimeDataChart() {
	//设置chart数据
	/*if (hourly_forecast.length >= 1) {
		var option = getOption(hourly_forecast,now);
		myChart.setOption(option,true);
	}*/

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
		url: "https://free-api.heweather.net/s6/weather?location=tianjin&key=e0377a2128f940f5a943cd187c18c5c4",
		dataType: 'json',
		success: function(data) {

			var o = data.HeWeather6[0];

			//var now = o.now;
			var today = o.daily_forecast[0];
			var tomo = o.daily_forecast[1];
			var aftomo = o.daily_forecast[2];


			var now = o.now;
			setHtmlValue("currTmp",now.tmp);
			setHtmlValue("currWeather",now.cond_txt);


			setHtmlValue("city",o.basic.location);
			//var o = JSON.parse(str);

			//设置今天天气
			setImgSrc("today_img","https://cdn.heweather.com/cond_icon/" + today.cond_code_d + ".png");
			//setHtmlValue("currTmp",now.tmp);
			//setHtmlValue("currWeather",now.cond_txt);
			setHtmlValue("today_temp",today.tmp_min + "-" + today.tmp_max + "℃");
			setHtmlValue("today_cond",today.cond_txt_d==today.cond_txt_n?today.cond_txt_d:(today.cond_txt_d + "转" + today.cond_txt_n));

			var today_wind = today.wind_dir + today.wind_sc;
			var reg = /^[\u4E00-\u9FA5]+$/;
			if (!reg.test(today.wind_sc)) {
				//不是中文，加级
				today_wind += "级";
			}
			setHtmlValue("today_wind",today_wind);

			//设置明天天气
			setHtmlValue("tomo_week",getWeekPlus(1));
			setImgSrc("tomo_img","https://cdn.heweather.com/cond_icon/" + tomo.cond_code_d + ".png")
			setHtmlValue("tomo_temp",tomo.tmp_min + "-" + tomo.tmp_max + "℃");
			setHtmlValue("tomo_cond",tomo.cond_txt_d==tomo.cond_txt_n?tomo.cond_txt_d:(tomo.cond_txt_d + "转" + tomo.cond_txt_n));

			var tomo_wind = tomo.wind_dir + tomo.wind_sc;
			var reg = /^[\u4E00-\u9FA5]+$/;
			if (!reg.test(tomo.wind_sc)) {
				//不是中文，加级
				tomo_wind += "级";
			}
			setHtmlValue("tomo_wind",tomo_wind);

			//设置后天天气
			setHtmlValue("aftomo_week",getWeekPlus(2));
			setImgSrc("aftomo_img","https://cdn.heweather.com/cond_icon/" + aftomo.cond_code_d + ".png")
			setHtmlValue("aftomo_temp",aftomo.tmp_min + "-" + aftomo.tmp_max + "℃");
			setHtmlValue("aftomo_cond",aftomo.cond_txt_d==aftomo.cond_txt_n?aftomo.cond_txt_d:(aftomo.cond_txt_d + "转" + aftomo.cond_txt_n));

			var aftomo_wind = aftomo.wind_dir + aftomo.wind_sc;
			var reg = /^[\u4E00-\u9FA5]+$/;
			if (!reg.test(aftomo.wind_sc)) {
				//不是中文，加级
				aftomo_wind += "级";
			}
			setHtmlValue("aftomo_wind",aftomo_wind);
		}
	});



}

function init() {
	setWeatherData();
	setWeatherQua();
	setTimeDataChart();
}

