function gettime() {
	$.ajax({
		url: "/time",
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			$("#tim").html(data)
		},
		error: function(xhr, type, errorThrown) {

		}
	});
}

function mqtt() {
	$.ajax({
		url: "/mqtt",
		timeout: 10000, //超时时间设置为10秒；
		success: function() {
		},
		error: function(xhr, type, errorThrown) {
		}
	});
}

function mqtt_data() {
	$.ajax({
		url: "/mqtt_data",
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var tmp="New "+data[11]+"<br>"+data[2]+"-"+data[4]+"的确诊人数更新为"+data[7]+" "+data[12]+"的确诊人数更新为"+data[15]
			console.log(data)
			//console.log(data.continentName)
			$("#mqtt_txt").html(tmp)
		},
		error: function(xhr, type, errorThrown) {
		}
	});
}

function gettime() {
	$.ajax({
		url: "/time",
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			$("#tim").html(data)
		},
		error: function(xhr, type, errorThrown) {

		}
	});
}

function init_province_count(provincesText) {
	$.ajax({
		url: "/province_count",
		timeout: 10000, //超时时间设置为10秒；
		type: "POST",
		data:{
			"pname": provincesText
		},
		success: function(data) {
			if(provincesText=='中国'){
                $("#con_confirm_num").text(data[0]);
			    $("#con_suspect_num").text(data[1]);
			    $("#con_cure_num").text(data[2]);
			    $("#con_dead_num").text(data[3]);
			}
			else{
				$("#pro_confirm_num").text(data[0]);
			    $("#pro_suspect_num").text(data[1]);
			    $("#pro_cure_num").text(data[2]);
			    $("#pro_dead_num").text(data[3]);
			}
		},
		error: function(xhr, type, errorThrown) {
		}
	})
}

function init_province_data(provincesData,provinces,provincesText) {
	$.ajax({
		url: "/province_data",
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var str = "";//定义用于拼接的字符串
			provincesData.length=0
			provinces.length=0
			provincesText.length=0
			$("#tab_country").html('<thead><tr style="text-align: left;"><th>省份</th><th>确诊</th><th>疑似</th><th>治愈</th><th>死亡</th></tr></thead><tbody></tbody>');
            for (var i = 0; i < data.length; i++) {
				if(data[i][0]=='中国')
				    continue;
				str = "<tr><td>" + data[i][0] + "</td><td>" + data[i][2] + "</td><td>"+ data[i][3] + "</td><td>"+data[i][4] + "</td><td>"+data[i][5] + "</td></tr>";
				$("#tab_country").append(str);//追加到table中
				var tmpdata={ name: data[i][0], value: [data[i][2],data[i][3],data[i][4],data[i][5]],time: data[i][6]}	
                provincesData.push(tmpdata);//追加到tmpdata
				provinces.push(data[i][1]);
				provincesText.push(data[i][0]);
            }
		},
		error: function(xhr, type, errorThrown) {
		}
	})
}

function init_city_data(citysData,provincesText) {
	$.ajax({
		url: "/city_data",
		timeout: 10000, //超时时间设置为10秒；
		type: "POST",
		data:{
			"pname": provincesText
		},
		success: function(data) {
			var str = "";//定义用于拼接的字符串
			console.log(data[0][0]);
            for (var i = 0; i < data.length; i++) {
				if(data[i][0]==null)
				    continue;
				str = "<tr><td>" + data[i][0] + "</td><td>" + data[i][2] + "</td><td>"+ data[i][3] + "</td><td>"+data[i][4] + "</td><td>"+data[i][5] + "</td></tr>";
				$("#tab_province").append(str);//追加到table中
				var tmpdata={ name: data[i][0], value: [data[i][2],data[i][3],data[i][4],data[i][5]],time: data[i][6]}	
                citysData.push(tmpdata);//追加到tmpdata
				//provinces.push(data[i][1]);
				//provincesText.push(data[i][0]);
            }
		},
		error: function(xhr, type, errorThrown) {
		}
	})
}

// (function(){
// 	$.ajax({
// 		url: "/bar_global_data",
// 		timeout: 10000,
// 		type: "POST",
// 		data:{
// 			"pname": ' '
// 		},
// 		success: function(data) {
// 			var confirm=[]//确诊
// 			var cure=[]//治愈
// 			var suspect=[]//疑似
// 			var dead=[]//死亡
// 			var time=[]//更新时间
// 			var country=[]//国家
// 			// 循环赋值
// 			for(var i=0; i<data.length; i++){
// 				confirm.push(data[i][0]);
// 				cure.push(data[i][1]);
// 				suspect.push(data[i][2]);
// 				dead.push(data[i][3]);
// 				country.push(data[i][4]);
// 			}
// 			var nchart=echarts.init(document.getElementById('right-chart'));
// 			var noption={
// 				color: ['#3398DB'],
// 				tooltip: {
// 						trigger: 'axis',
// 					 	axisPointer: { // 坐标轴指示器，坐标轴触发有效
// 					 		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
// 						}
// 						// formatter(params) {
// 						// 	//return `${params.data.name}</br>累计确诊：${params.data.value[0]}</br>累计治愈：${params.data.value[1]}</br>剩余疑似：${params.data.value[2]}</br>累计死亡：${params.data.value[3]}</br>更新时间：${params.data.value[4]}`
// 						// },
// 					},
// 				legend:{
// 					data:['确诊','治愈','疑似','死亡']
// 				},
// 				grid: {
// 					top:'20%',
// 			 		left: '3%',
// 			 		right: '4%',
// 			 		bottom: '3%',
// 			 		containLabel: true
// 			 	},
// 				yAxis:[{
// 					type:'category',
// 					data:country,
// 					axisTick: {length:1},
// 				}],
// 				xAxis:[
// 					{
// 					type: 'value',
// 			 		scale: true,
// 			 		// name: '人数'
// 			 		//min : 60, // 就是这两个 最小值
// 			 		//max : 'dataMax', // 最大值
// 			 		//splitNumber: 20,
// 			 		//boundaryGap: [0.2, 0.2]
// 					}
// 				],
// 				series:[
// 					{
// 				 		name: '确诊',
// 				 		type: 'bar',
// 				 		data:confirm
// 						// itemStyle: {
// 						// 	normal: {
// 						// 		color: '#a80000', //改变折线点的颜色
// 						// 		lineStyle: {
// 						// 			color: '#a80000' //改变折线颜色
// 						// 		}
// 						// 	}
// 						// }
// 					},
// 					{
// 						name: '治愈',
// 				 		type: 'bar',
// 				 		data:cure
// 						//  itemStyle: {
// 						// 	normal: {
// 						// 		color: '#ff6f73', //改变折线点的颜色
// 						// 		lineStyle: {
// 						// 			color: '#ff6f73' //改变折线颜色
// 						// 		}
// 						// 	}
// 						// }
// 					},
// 					{
// 						name: '疑似',
// 				 		type: 'bar',
// 				 		data:suspect
// 						//  itemStyle: {
// 						// 	normal: {
// 						// 		color: '#ffa438', //改变折线点的颜色
// 						// 		lineStyle: {
// 						// 			color: '#ffa438' //改变折线颜色
// 						// 		}
// 						// 	}
// 						// }
// 					},
// 					{
// 						name: '死亡',
// 				 		type: 'bar',
// 				 		data:dead
// 						//  itemStyle: {
// 						// 	normal: {
// 						// 		color: '#ffda42', //改变折线点的颜色
// 						// 		lineStyle: {
// 						// 			color: '#ffda42' //改变折线颜色
// 						// 		}
// 						// 	}
// 						// }
// 					}
// 			]
// 			};
// 			nchart.setOption(noption,true);
// 			// var str = "";//定义用于拼接的字符串
// 			// var x_data=[];//时间
// 			// var y_data=[];//累计
// 			// 
			
// 			// //console.log(data[0][0]);
// 			// console.log(JSON.stringify(data))
// 			// //data应该是 [[时间，累计][时间，累计]...]
//             // for (var i = 0; i < data.length; i++) {
// 			// 	if(data[i][0]==null||data[i][1]==null)
// 			// 	    continue;
// 			// 	var obj = data[i];
// 			// 	x_data.append(data[i].time);
// 			// 	y_data.append(data[i].value);
// 			// 	// str = "<tr><td>" + data[i][0] + "</td><td>" + data[i][2] + "</td><td>"+ data[i][3] + "</td><td>"+data[i][4] + "</td><td>"+data[i][5] + "</td></tr>";
// 			// 	// $("#tab_province").append(str);//追加到table中
// 			// 	// var tmpdata={ name: data[i][0], value: [data[i][2],data[i][3],data[i][4],data[i][5]],time: data[i][6]}	
//             //     // citysData.push(tmpdata);//追加到tmpdata
// 			// 	//provinces.push(data[i][1]);
// 			// 	//provincesText.push(data[i][0]);
//             // }
// 			// var Chart = echarts.init(document.getElementById('bottom-chart'));
// 			// var option = {
// 			// 	color: ['#3398DB'],
// 			// 	tooltip: {
// 			// 		trigger: 'axis',
// 			// 		axisPointer: { // 坐标轴指示器，坐标轴触发有效
// 			// 			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
// 			// 		}
// 			// 	},
// 			// 	legend: {
// 			// 		data: ['累计']
// 			// 	},
// 			// 	grid: {
// 			// 		left: '3%',
// 			// 		right: '20%',
// 			// 		bottom: '20%',
// 			// 		containLabel: true
// 			// 	},
// 			// 	xAxis: [{
// 			// 		type: 'category',
// 			// 		data: ["2020-11-18 00:08:36", "2020-11-18 00:18:42", "2020-11-18 00:28:46", "2020-11-18 00:38:33",
// 			// 		"2020-11-18 00:48:43", "2020-11-18 00:58:36", "2020-11-18 01:08:40", "2020-11-18 01:18:36", "2020-11-18 01:28:42",
// 			// 		"2020-11-18 01:38:39", "2020-11-18 01:48:45", "2020-11-18 01:58:35", "2020-11-18 02:08:34", "2020-11-18 02:18:32",
// 			// 		"2020-11-18 02:28:38", "2020-11-18 02:38:37", "2020-11-18 02:48:44", "2020-11-18 02:58:49", "2020-11-18 03:08:38",
// 			// 		"2020-11-18 03:18:42", "2020-11-18 03:28:35", "2020-11-18 03:38:44", "2020-11-18 03:48:35", "2020-11-18 03:58:50",
// 			// 		"2020-11-18 04:08:40", "2020-11-18 04:18:46", "2020-11-18 04:28:48", "2020-11-18 04:38:46", "2020-11-18 04:48:35",
// 			// 		"2020-11-18 04:58:46", "2020-11-18 05:08:38", "2020-11-18 05:18:34", "2020-11-18 05:28:46", "2020-11-18 05:38:35",
// 			// 		"2020-11-18 05:48:41", "2020-11-18 05:58:38", "2020-11-18 06:08:41", "2020-11-18 06:18:49", "2020-11-18 06:28:46",
// 			// 		"2020-11-18 06:38:43", "2020-11-18 06:48:40", "2020-11-18 06:58:47", "2020-11-18 07:08:36", "2020-11-18 07:18:35",
// 			// 		"2020-11-18 07:28:51", "2020-11-18 07:38:45", "2020-11-18 07:48:39", "2020-11-18 07:58:42", "2020-11-18 08:08:51",
// 			// 		"2020-11-18 08:18:37", "2020-11-18 08:28:43", "2020-11-18 08:38:46", "2020-11-18 08:48:54", "2020-11-18 08:58:52",
// 			// 		"2020-11-18 09:08:51", "2020-11-18 09:18:36", "2020-11-18 09:28:41", "2020-11-18 09:38:42", "2020-11-18 09:48:48",
// 			// 		"2020-11-18 09:58:52", "2020-11-18 10:08:48", "2020-11-18 10:18:38", "2020-11-18 10:28:49", "2020-11-18 10:38:44",
// 			// 		"2020-11-18 10:48:37", "2020-11-18 11:08:49", "2020-11-18 11:18:49"
// 			// 	]
// 			// 	}],
// 			// 	yAxis: [{ // 纵轴标尺固定
// 			// 		type: 'value',
// 			// 		scale: true,
// 			// 		// name: '累计',
// 			// 		min : 60, // 就是这两个 最小值
// 			// 		max : 'dataMax', // 最大值
// 			// 		splitNumber: 20,
// 			// 		boundaryGap: [0.2, 0.2]
// 			// 	}],
// 			// 	series: [{
// 			// 		name: '累计',
// 			// 		type: 'line',
// 			// 		data: [80, 112, 90, 91, 104, 99, 107, 106, 121, 105, 106, 109, 102, 79, 81, 64, 70, 89, 108, 86, 62, 60, 74, 71,
// 			// 			112, 89, 81, 117, 90, 62, 90, 100, 99, 104, 103, 93, 113, 114, 74, 86, 115, 80, 119, 113, 96, 104, 111, 98, 93, 101,
// 			// 			93, 101, 60, 78, 79, 93, 69, 98, 124, 104, 108, 100, 104, 74, 100, 102, 75
// 			// 		]
// 			// 	}]
// 			// };
// 			// Chart.setOption(option,true);

// 		},
// 		error: function(xhr, type, errorThrown) {
// 			console.log("???")
// 		}

// 	})
// 	// document.getElementById("bottom-chart").style.display="block";
// })()

function set_line_chart(provincesText){
	$.ajax({
		url: "/line_province_data",
		timeout: 10000,
		type: "POST",
		data:{
			"pname": provincesText
		},
		success: function(data) {
			var confirm=[]//确诊
			var cure=[]//治愈
			var suspect=[]//疑似
			var dead=[]//死亡
			var time=[]//时间
			// 循环赋值
			for(var i=0; i<data.length; i++){
				confirm.push(data[i][0]);
				cure.push(data[i][1]);
				suspect.push(data[i][2]);
				dead.push(data[i][3]);
				time.push(data[i][4]);
			}
			var nchart=echarts.init(document.getElementById('bottom-chart'));
			var noption={
				dataZoom : [
					{
						type: 'slider',//有单独的滑动条，用户在滑动条上进行缩放或漫游。inside是直接可以是在内部拖动显示
						show: true,//是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
						start: 0,//数据窗口范围的起始百分比0-100
						end: 50,//数据窗口范围的结束百分比0-100
						xAxisIndex: [0],// 此处表示控制第一个xAxis，设置 dataZoom-slider 组件控制的 x轴 可是已数组[0,2]表示控制第一，三个；xAxisIndex: 2 ，表示控制第二个。yAxisIndex属性同理
						bottom:-10 //距离底部的距离
					  }
				],
				color: ['#3398DB'],
				tooltip: {
						trigger: 'axis',
					 	axisPointer: { // 坐标轴指示器，坐标轴触发有效
					 		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
				legend:{
					data:['确诊','治愈','疑似','死亡']
				},
				grid: {
			 		left: '3%',
			 		right: '20%',
			 		bottom: '20%',
			 		containLabel: true
			 	},
				xAxis:[{
					type:'category',
					data:time,
					axisTick: {length:1},
					axisLabel: {
						interval:2,//代表显示所有x轴标签显示
						rotate:-30,
						textStyle:{
							color:'#7edae8'  //坐标的字体颜色
						}
					}
				}],
				yAxis:[
					{
					type: 'value',
			 		scale: true,
			 		 name: provincesText,
					  axisLabel: {
						interval:0,//代表显示所有x轴标签显示
						textStyle:{
							color:'#7edae8'  //坐标的字体颜色
						}
					}
			 		//min : 60, // 就是这两个 最小值
			 		//max : 'dataMax', // 最大值
			 		//splitNumber: 20,
			 		//boundaryGap: [0.2, 0.2]
					}
				],
				series:[
					{
				 		name: '确诊',
				 		type: 'line',
				 		data:confirm,
						itemStyle: {
							normal: {
								color: '#a80000', //改变折线点的颜色
								lineStyle: {
									color: '#a80000' //改变折线颜色
								}
							}
						}
					},
					{
						name: '治愈',
				 		type: 'line',
				 		data:cure,
						 itemStyle: {
							normal: {
								color: '#ff6f73', //改变折线点的颜色
								lineStyle: {
									color: '#ff6f73' //改变折线颜色
								}
							}
						}
					},
					{
						name: '疑似',
				 		type: 'line',
				 		data:suspect,
						 itemStyle: {
							normal: {
								color: '#ffa438', //改变折线点的颜色
								lineStyle: {
									color: '#ffa438' //改变折线颜色
								}
							}
						}
					},
					{
						name: '死亡',
				 		type: 'line',
				 		data:dead,
						 itemStyle: {
							normal: {
								color: '#ffda42', //改变折线点的颜色
								lineStyle: {
									color: '#ffda42' //改变折线颜色
								}
							}
						}
					}
			]
			};
			nchart.setOption(noption,true);
		},
		error: function(xhr, type, errorThrown) {
			console.log("???")
		}

	})
}

function set_bar_chart()
{
	$.ajax({
		url: "/bar_global_data",
		timeout: 10000,
		type: "POST",
		data:{
			"pname": ' '
		},
		success: function(data) {
			var confirm=[]//确诊
			var cure=[]//治愈
			var suspect=[]//疑似
			var dead=[]//死亡
			var time=[]//更新时间
			var country=[]//国家
			// 循环赋值
			for(var i=0; i<data.length; i++){
				confirm.push(data[i][0]);
				cure.push(data[i][1]);
				suspect.push(data[i][2]);
				dead.push(data[i][3]);
				time.push(data[i][4])
				country.push(data[i][5]);
			}
			var nchart=echarts.init(document.getElementById('right-chart'));
			var noption={
				dataZoom : [
					{
					type: 'slider',
					show: true,
					yAxisIndex: [0],//设置组件控制的y轴
					left: '93%',//距离左侧的距离 可以使百分比，也可以是像素 left: '30'（30像素）
					start: 29,
					end: 36
				}],
				
				color: ['#3398DB'],
				tooltip: {
						trigger: 'axis',
					 	axisPointer: { // 坐标轴指示器，坐标轴触发有效
					 		type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
						// formatter(params) {
						// 	//return `${params.data.name}</br>累计确诊：${params.data.value[0]}</br>累计治愈：${params.data.value[1]}</br>剩余疑似：${params.data.value[2]}</br>累计死亡：${params.data.value[3]}</br>更新时间：${params.data.value[4]}`
						// },
					},
				legend:{
					data:['确诊','治愈','疑似','死亡']
				},
				grid: {
					top:'10%',
			 		left: '3%',
			 		right: '4%',
			 		bottom: '3%',
			 		containLabel: true
			 	},
				yAxis:[{
					type:'category',
					data:country,
					axisTick: {length:1},
					axisLabel: {
						interval:0,//代表显示所有x轴标签显示
						textStyle:{
							color:'#7edae8'  //坐标的字体颜色
						}
					}
					
				}],
				xAxis:[
					{
					type: 'value',
			 		scale: false,
					axisLabel: {
						show: false,//不显示坐标轴上的文字
						textStyle:{
							color:'#7edae8'  //坐标的字体颜色
						}
					},
			 		// name: '人数'
			 		//min : 60, // 就是这两个 最小值
			 		//max : 'dataMax', // 最大值
			 		//splitNumber: 20,
			 		//boundaryGap: [0.2, 0.2]
					}
				],
				series:[
					{
				 		name: '确诊',
				 		type: 'bar',
				 		data:confirm,
						itemStyle: {
							normal: {
								color: '#a80000', //改变折线点的颜色
							}
						}
					},
					{
						name: '治愈',
				 		type: 'bar',
				 		data:cure,
						 itemStyle: {
							normal: {
								color: '#ff6f73', //改变折线点的颜色
							}
						}
					},
					{
						name: '疑似',
				 		type: 'bar',
				 		data:suspect,
						 itemStyle: {
							normal: {
								color: '#ffa438', //改变折线点的颜色
							}
						}
					},
					{
						name: '死亡',
				 		type: 'bar',
				 		data:dead,
						 itemStyle: {
							normal: {
								color: '#ffda42', //改变折线点的颜色
							}
						}
					}
			]
			};
			nchart.setOption(noption,true);
			// var str = "";//定义用于拼接的字符串
			// var x_data=[];//时间
			// var y_data=[];//累计
			// 
			
			// //console.log(data[0][0]);
			// console.log(JSON.stringify(data))
			// //data应该是 [[时间，累计][时间，累计]...]
            // for (var i = 0; i < data.length; i++) {
			// 	if(data[i][0]==null||data[i][1]==null)
			// 	    continue;
			// 	var obj = data[i];
			// 	x_data.append(data[i].time);
			// 	y_data.append(data[i].value);
			// 	// str = "<tr><td>" + data[i][0] + "</td><td>" + data[i][2] + "</td><td>"+ data[i][3] + "</td><td>"+data[i][4] + "</td><td>"+data[i][5] + "</td></tr>";
			// 	// $("#tab_province").append(str);//追加到table中
			// 	// var tmpdata={ name: data[i][0], value: [data[i][2],data[i][3],data[i][4],data[i][5]],time: data[i][6]}	
            //     // citysData.push(tmpdata);//追加到tmpdata
			// 	//provinces.push(data[i][1]);
			// 	//provincesText.push(data[i][0]);
            // }
			// var Chart = echarts.init(document.getElementById('bottom-chart'));
			// var option = {
			// 	color: ['#3398DB'],
			// 	tooltip: {
			// 		trigger: 'axis',
			// 		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			// 			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			// 		}
			// 	},
			// 	legend: {
			// 		data: ['累计']
			// 	},
			// 	grid: {
			// 		left: '3%',
			// 		right: '20%',
			// 		bottom: '20%',
			// 		containLabel: true
			// 	},
			// 	xAxis: [{
			// 		type: 'category',
			// 		data: ["2020-11-18 00:08:36", "2020-11-18 00:18:42", "2020-11-18 00:28:46", "2020-11-18 00:38:33",
			// 		"2020-11-18 00:48:43", "2020-11-18 00:58:36", "2020-11-18 01:08:40", "2020-11-18 01:18:36", "2020-11-18 01:28:42",
			// 		"2020-11-18 01:38:39", "2020-11-18 01:48:45", "2020-11-18 01:58:35", "2020-11-18 02:08:34", "2020-11-18 02:18:32",
			// 		"2020-11-18 02:28:38", "2020-11-18 02:38:37", "2020-11-18 02:48:44", "2020-11-18 02:58:49", "2020-11-18 03:08:38",
			// 		"2020-11-18 03:18:42", "2020-11-18 03:28:35", "2020-11-18 03:38:44", "2020-11-18 03:48:35", "2020-11-18 03:58:50",
			// 		"2020-11-18 04:08:40", "2020-11-18 04:18:46", "2020-11-18 04:28:48", "2020-11-18 04:38:46", "2020-11-18 04:48:35",
			// 		"2020-11-18 04:58:46", "2020-11-18 05:08:38", "2020-11-18 05:18:34", "2020-11-18 05:28:46", "2020-11-18 05:38:35",
			// 		"2020-11-18 05:48:41", "2020-11-18 05:58:38", "2020-11-18 06:08:41", "2020-11-18 06:18:49", "2020-11-18 06:28:46",
			// 		"2020-11-18 06:38:43", "2020-11-18 06:48:40", "2020-11-18 06:58:47", "2020-11-18 07:08:36", "2020-11-18 07:18:35",
			// 		"2020-11-18 07:28:51", "2020-11-18 07:38:45", "2020-11-18 07:48:39", "2020-11-18 07:58:42", "2020-11-18 08:08:51",
			// 		"2020-11-18 08:18:37", "2020-11-18 08:28:43", "2020-11-18 08:38:46", "2020-11-18 08:48:54", "2020-11-18 08:58:52",
			// 		"2020-11-18 09:08:51", "2020-11-18 09:18:36", "2020-11-18 09:28:41", "2020-11-18 09:38:42", "2020-11-18 09:48:48",
			// 		"2020-11-18 09:58:52", "2020-11-18 10:08:48", "2020-11-18 10:18:38", "2020-11-18 10:28:49", "2020-11-18 10:38:44",
			// 		"2020-11-18 10:48:37", "2020-11-18 11:08:49", "2020-11-18 11:18:49"
			// 	]
			// 	}],
			// 	yAxis: [{ // 纵轴标尺固定
			// 		type: 'value',
			// 		scale: true,
			// 		// name: '累计',
			// 		min : 60, // 就是这两个 最小值
			// 		max : 'dataMax', // 最大值
			// 		splitNumber: 20,
			// 		boundaryGap: [0.2, 0.2]
			// 	}],
			// 	series: [{
			// 		name: '累计',
			// 		type: 'line',
			// 		data: [80, 112, 90, 91, 104, 99, 107, 106, 121, 105, 106, 109, 102, 79, 81, 64, 70, 89, 108, 86, 62, 60, 74, 71,
			// 			112, 89, 81, 117, 90, 62, 90, 100, 99, 104, 103, 93, 113, 114, 74, 86, 115, 80, 119, 113, 96, 104, 111, 98, 93, 101,
			// 			93, 101, 60, 78, 79, 93, 69, 98, 124, 104, 108, 100, 104, 74, 100, 102, 75
			// 		]
			// 	}]
			// };
			// Chart.setOption(option,true);

		},
		error: function(xhr, type, errorThrown) {
			console.log("???")
		}

	})
}
set_bar_chart()
//set_line_chart("provincesText")
gettime()
mqtt()
mqtt_data()
setInterval(gettime,1000)
setInterval(mqtt_data,1000)
