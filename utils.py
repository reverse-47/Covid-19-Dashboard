import datetime
import time
import pandas as pd 
import pymysql
from decimal import Decimal
import json
from paho.mqtt import client as mqtt_client

global data_from_mqtt
data_from_mqtt="New"

broker = '124.223.95.200'
port = 1883
topic = "data"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-0'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        global data_from_mqtt
        data_from_mqtt= msg.payload.decode()
        insert_db()
        print(data_from_mqtt)
    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()

def get_time():
    time_str = time.strftime("%Y{}%m{}%d{} </br>%X")
    return time_str.format("年", "月", "日")

def get_mqtt_data():
    global data_from_mqtt
    res = json.loads(data_from_mqtt)
    res_list = list(res.values())
    return res_list

def insert_db():
    res = json.loads(data_from_mqtt)
    res_list = list(res.values())
    res_list[12]="none"
    res_list[13]="none"
    res_list[14]="none"
    res_list[15]="none"
    res_list[16]="none"
    res_list[17]="none"
    res_list[18]="none"
    for i in range(0,19):
        res_list[i]=str(res_list[i])
        print(res_list[i])
    #res_list[11]=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    conn=get_conn()
    # 创建连接
    cur = conn.cursor()
    tmp = "'"+res_list[0]+"'"+","+"'"+res_list[1]+"'"+","+"'"+res_list[2]+"'"+","+"'"+res_list[3]+"'"+","+"'"+res_list[4]+"'"+","+"'"+res_list[5]+"'"+","+"'"+res_list[6]+"'"+","+"'"+res_list[7]+"'"+","+"'"+res_list[8]+"'"+","+"'"+res_list[9]+"'"+","+"'"+res_list[10]+"'"+","+"'"+res_list[11]+"'"+","+"'"+res_list[12]+"'"+","+"'"+res_list[13]+"'"+","+"'"+res_list[14]+"'"+","+"'"+res_list[15]+"'"+","+"'"+res_list[16]+"'"+","+"'"+res_list[17]+"'"+","+"'"+res_list[18]+"'"
    print(tmp)
    #sql=f"INSERT INTO `iot_test`.`dxyarea`(continentName,continentEnglishName,countryName,countryEnglishName,provinceName,provinceEnglishName,province_zipCode,province_confirmedCount,province_suspectedCount,province_cured_Count,province_deadCount,updateTime,cityName,cityEnglishName,city_zipCode,city_confirmedCount,city_suspectedCount,city_curedCount,city_deadCount) VALUES ({res_list[0]}, {res_list[1]}, {res_list[2]}, {res_list[3]}, {res_list[4]}, {res_list[5]}, {res_list[6]}, {res_list[7]}, {res_list[8]}, {res_list[9]}, {res_list[10]}, {res_list[11]}, {res_list[12]}, {res_list[13]}, {res_list[14]}, {res_list[15]}, {res_list[16]} ,{res_list[17]}, {res_list[18]})"
    sql="REPLACE INTO `iot_test`.`dxyarea`(continentName,continentEnglishName,countryName,countryEnglishName,provinceName,provinceEnglishName,province_zipCode,province_confirmedCount,province_suspectedCount,province_curedCount,province_deadCount,updateTime,cityName,cityEnglishName,city_zipCode,city_confirmedCount,city_suspectedCount,city_curedCount,city_deadCount) VALUES ("+tmp+")"
    cur.execute(sql)
    conn.commit()
    cur.close()
    conn.close()

def get_conn():
    # conn = pymysql.connect(host='63f819e3be649679.natapp.cc',
    #                    port = 46556,
    #                    user = 'lukas',
    #                    password = 'cn',
    #                    db = 'lukas',
    #                    charset = 'utf8mb4',
    #                    cursorclass = pymysql.cursors.DictCursor)
    conn = pymysql.connect(host= 'gz-cynosdbmysql-grp-17pikoep.sql.tencentcdb.com',
                            port = 22639,
                            user = 'IOT',
                            password='MQTT',
                            db = 'iot_test',
                            charset='utf8',
                            cursorclass=pymysql.cursors.DictCursor)
    return conn

def init_province_count(pname):
    conn=get_conn()
    # 创建连接
    cur = conn.cursor()
    sql="SELECT province_confirmedCount,province_suspectedCount,province_curedCount,province_deadCount,MAX(updateTime) FROM `iot_test`.`dxyarea` WHERE provinceName=%s LIMIT 1"
    cur.execute(sql,pname)
    res = cur.fetchall()
    res_list = list(res[0].values())
    res_list[4]=res_list[4].strftime("%Y-%m-%d %H:%M:%S")
    cur.close()
    conn.close()
    return res_list

def init_province_data():
    conn=get_conn()
    # 创建连接
    cur = conn.cursor()
    sql="SELECT provinceName,provinceEnglishName,province_confirmedCount,province_suspectedCount,province_curedCount,province_deadCount,MAX(updateTime) FROM `iot_test`.`dxyarea` WHERE countryName='中国' GROUP BY provinceName "
    cur.execute(sql)
    res = cur.fetchall()
    china_province_data=[]
    for i in range(0,len(res)):
        res_list = list(res[i].values())
        res_list[6]=res_list[6].strftime("%Y-%m-%d %H:%M:%S")
        china_province_data.append(res_list)
    print(china_province_data)
    cur.close()
    conn.close()
    return china_province_data

def init_city_data(pname):
    conn=get_conn()
    # 创建连接
    cur = conn.cursor()
    sql="SELECT cityName,cityEnglishName,city_confirmedCount,city_suspectedCount,city_curedCount,city_deadCount,MAX(updateTime) FROM `iot_test`.`dxyarea` WHERE provinceName=%s GROUP BY cityName"
    cur.execute(sql,pname)
    res = cur.fetchall()
    province_city_data=[]
    for i in range(0,len(res)):
        res_list = list(res[i].values())
        res_list[6]=res_list[6].strftime("%Y-%m-%d %H:%M:%S")
        province_city_data.append(res_list)
    # print(province_city_data)
    cur.close()
    conn.close()
    return province_city_data

# 省按时100总和
def line_province_chart(pname):
    if(pname ==' '):
        return {'none global'}
    conn=get_conn()
    cur=conn.cursor()
    sql="SELECT DISTINCT SUM(province_confirmedCount), SUM(province_curedCount), SUM(province_suspectedCount), SUM(province_deadCount),updateTime FROM `iot_test`.`dxyarea` WHERE provinceName=%s GROUP BY updateTime ORDER BY updateTime DESC LIMIT 100;"
    cur.execute(sql,pname)
    #cur.execute(sql)
    res = cur.fetchall()
    line_province_data=[]
    for i in range(0,len(res)):
        res_list = list(res[i].values()) #行数据
        res_list[4]=res_list[4].strftime("%Y-%m-%d %H:%M:%S")
        line_province_data.append(res_list)
    print(line_province_data)
    cur.close()
    conn.close()
    line_province_data=line_province_data[::-1]
    return line_province_data


def bar_global_chart():
    conn=get_conn()
    cur=conn.cursor()
    sql="SELECT DISTINCT province_confirmedCount, province_curedCount, province_suspectedCount, province_deadCount,MAX(updateTime), provinceName FROM `iot_test`.`dxyarea` WHERE countryName!='中国' GROUP BY provinceName  ORDER BY provinceName DESC;"
    cur.execute(sql)
    res=cur.fetchall()
    bar_global_data=[]
    for i in range(0,len(res)):
        res_list = list(res[i].values()) #行数据
        res_list[4]=res_list[4].strftime("%Y-%m-%d %H:%M:%S")
        bar_global_data.append(res_list)
    cur.close()
    conn.close()
    return bar_global_data
# 城市按时四项
def line_city_chart(pname):
    conn=get_conn()
    cur=conn.cursor()
    sql="SELECT DISTINCT city_confirmedCount, city_cureCount, city_suspected, city_deadCount, updateTime FROM 'ios_test'.'dxyarea' WHERE provinceName=%s ORDER BY updateTime DESC LIMIT 100;"
    cur.execute(sql,pname)
    res=cur.fetchall()
    line_city_data=[]
    for i in range(0,len(res)):
        res_list = list(res[i].values()) #行数据
        res_list[4]=res_list[4].strftime("%Y-%m-%d %H:%M:%S")
        line_city_data.append(res_list)
    cur.close()
    conn.close()
    line_city_data=line_city_data[::-1]
    return line_city_data