var myChart = echarts.init(document.getElementById('china-map'));
var oBack = document.getElementById("back");
var oRefresh_china = document.getElementById("refresh_china");
var oRefresh_province = document.getElementById("refresh_province");
var provinces = [];
var provincesText = [];
var provincesData=[];
var citysData=[]
init_province_count('中国')//初始化中国数据
init_province_data(provincesData,provinces,provincesText)//初始化中国数据
set_line_chart(provincesText)

oRefresh_china.onclick = function () {
    initEcharts("china", "中国");
    init_province_data(provincesData,provinces,provincesText)//初始化中国数据
}

oBack.onclick = function () {
    initEcharts("china", "中国");
    $("#tab_province").html('<thead><tr style="text-align: left;"><th>市</th><th>确诊</th><th>疑似</th><th>治愈</th><th>死亡</th></tr></thead><tbody></tbody>');
    $("#pro_confirm_num").html('');
    $("#pro_suspect_num").html('');
    $("#pro_cure_num").html('');
    $("#pro_dead_num").html('');
    $("#txt").html('全国累计');
    document.getElementById("tab_country").style.display="block";
    document.getElementById("tab_province").style.display="none";
    document.getElementById("con_confirm_num").style.display = "block";
    document.getElementById("con_suspect_num").style.display = "block";
    document.getElementById("con_cure_num").style.display = "block";
    document.getElementById("con_dead_num").style.display = "block";
    document.getElementById("pro_confirm_num").style.display = "none";
    document.getElementById("pro_suspect_num").style.display = "none";
    document.getElementById("pro_cure_num").style.display = "none";
    document.getElementById("pro_dead_num").style.display = "none";
    document.getElementById("back").style.display="none";
    document.getElementById("refresh_province").style.display = "none";
    document.getElementById("refresh_china").style.display = "block";
};

// 初始化echarts
function initEcharts(pName, Chinese_) {
    var tmpData;
    if(pName=='china'){
        tmpData = provincesData;
    }
    else{
        tmpData = citysData;
    }
    var option = {
        series: [
            {
                name: Chinese_ || pName,
                type: 'map',
                mapType: pName,
                roam:false,//是否开启鼠标缩放和平移漫游
                data: tmpData,
                zoom: 1.2,
                selectedMode: 'single',
                label: {
                    normal: {
                        show: true,//显示省份标签
                        textStyle: { color: "#000333" }//省份标签字体颜色
                    },
                    emphasis: {//对应的鼠标悬浮效果
                        show: true,
                        textStyle: { color: "#000333" }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5,//区域边框宽度
                        borderColor: '#ffffff',//区域边框颜色
                        areaColor: "#cdcdc3",//区域颜色

                    },
                    emphasis: {
                        borderWidth: 3,
                        borderColor: '#1ed8d5',
                        areaColor: "#cdcdc3",
                    }
                },
            }
        ],
        tooltip: {
            trigger: 'item',
            formatter(params) {
                return `${params.data.name}</br>累计确诊：${params.data.value[0]}</br>剩余疑似：${params.data.value[1]}</br>累计治愈：${params.data.value[2]}</br>累计死亡：${params.data.value[3]}</br>更新时间：${params.data.time}`
            },
        },
        visualMap: [
            { 
                type : 'piecewise',
                left : 5,
                textStyle:{color:'#ffffff'},
                dimension:2,       
                pieces : [
                    { min : 2000 , color : '#8f501b' },
                    { min : 1500 , max : 2000 , color : '#b57b27' },
                    { min : 1000 , max : 1500 , color : '#c99736' },
                    { min : 500 , max : 1000 , color : '#cdab49' },
                    { min : 100 , max : 500 , color : '#d8d576' },
                    { max : 100 , color : '#cdcdc3' }
                ]
            }
        ]
    };

    var option2 = {
        series: [
            {
                name: Chinese_ || pName,
                type: 'map',
                mapType: pName,
                roam:false,//是否开启鼠标缩放和平移漫游
                data: tmpData,
                zoom: 1.2,
                selectedMode: 'single',
                label: {
                    normal: {
                        show: true,//显示省份标签
                        textStyle: { color: "#000333" }//省份标签字体颜色
                    },
                    emphasis: {//对应的鼠标悬浮效果
                        show: true,
                        textStyle: { color: "#000333" }
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5,//区域边框宽度
                        borderColor: '#ffffff',//区域边框颜色
                        areaColor: "#cdcdc3",//区域颜色

                    },
                    emphasis: {
                        borderWidth: 3,
                        borderColor: '#1ed8d5',
                        areaColor: "#cdcdc3",
                    }
                },
            }
        ],
        tooltip: {
            trigger: 'item',
            formatter(params) {
                return `${params.data.name}</br>累计确诊：${params.data.value[0]}</br>剩余疑似：${params.data.value[1]}</br>累计治愈：${params.data.value[2]}</br>累计死亡：${params.data.value[3]}</br>更新时间：${params.data.time}`
            },
        },
        visualMap: [
            { 
                type : 'piecewise',
                left : 5,
                textStyle:{color:'#ffffff'},
                dimension:2,       
                pieces : [
                    { min : 500 , color : '#8f501b' },
                    { min : 100 , max : 500 , color : '#b57b27' },
                    { min : 50 , max : 100 , color : '#c99736' },
                    { min : 10 , max : 50 , color : '#cdab49' },
                    { min : 5 , max : 10 , color : '#d8d576' },
                    { max : 5 , color : '#cdcdc3' }
                ]
            }
        ]
    };
    if(pName=='china'){
        myChart.setOption(option);
    }
    else{
        myChart.setOption(option2);
    }
   
    myChart.off("click");
    
    if (pName === "china") { // 全国时，添加click 进入省级
        myChart.on('click', function (param) {
            console.log(param.name);
            // 遍历取到provincesText 中的下标  去拿到对应的省js
            for (var i = 0; i < provincesText.length; i++) {
                if (param.name === provincesText[i]) {
                    //显示对应省份的方法
                    $("#txt").html(provincesText[i]+"累计");
                    document.getElementById("back").style.display="block";
                    document.getElementById("refresh_province").style.display = "block";
                    document.getElementById("refresh_china").style.display = "none";
                    document.getElementById("tab_country").style.display="none";
                    document.getElementById("tab_province").style.display="block";
                    document.getElementById("con_confirm_num").style.display="none";
                    document.getElementById("con_suspect_num").style.display="none";
                    document.getElementById("con_cure_num").style.display="none";
                    document.getElementById("con_dead_num").style.display="none";
                    document.getElementById("pro_confirm_num").style.display = "block";
                    document.getElementById("pro_suspect_num").style.display = "block";
                    document.getElementById("pro_cure_num").style.display = "block";
                    document.getElementById("pro_dead_num").style.display = "block";
                    oRefresh_province.onclick = function () {
                        showProvince(provinces[i], provincesText[i]);
                    }
                    set_line_chart(provincesText)
                    showProvince(provinces[i], provincesText[i]);
                    init_province_count(provincesText[i]);
                    init_city_data(citysData,provincesText[i]);
                    set_line_chart(provincesText[i]);
                    break;
                }
            }
        });
        //get_c1_data("951001")
    }
}

// 展示对应的省
function showProvince(pName, Chinese_) {
    //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
    if(Chinese_==='陕西省')
        pName='Shanxi1';
    loadBdScript('$' + pName + 'JS', '../static/js/country/china/province/' + pName + '.js', function () {
        initEcharts(Chinese_);
    });
}

// 加载对应的JS
function loadBdScript(scriptId, url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("head")[0].appendChild(script);
};

initEcharts("china", "中国");