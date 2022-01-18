import moment from 'moment'
import axios from 'axios'
const KEY = 'g1awEbqZBda7FCRmozw5nrlS7ojS5sPPuOlUtQtUCdsBNAeLPB3tBSemc9YqM%2BwaUbshlgYyrCIVbTPJlhcTLg%3D%3D'

const weather = {
  namespaced: true,
  state: {
    nowDeg: 0,
    nowVec: 0,
    nowWsd: 0,
    todayDust: 0,
    todayMicroDust: 0,
    infoDataList: [],
    todayWeathersOnTimes: [],
    subInfoDataList: [],
    tenDaysWeather: [],
    gridObj: {x: 0, y: 0}
  },
  mutations: {
    tudeToGrid(state, position) {
      const lat = position._y
      const lon = position._x
  
      const RE = 6371.00877;
      const GRID = 5.0;
      const SLAT1 = 30.0;
      const SLAT2 = 60.0;
      const OLON = 126.0;
      const OLAT = 38.0;
      const XO = 43;
      const YO = 136;
  
      const DEGRAD = Math.PI / 180.0;
      const re = RE / GRID;
      const slat1 = SLAT1 * DEGRAD;
      const slat2 = SLAT2 * DEGRAD;
      const olon = OLON * DEGRAD;
      const olat = OLAT * DEGRAD;
  
      let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
      let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
      sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
      let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
      ro = re * sf / Math.pow(ro, sn);
  
      let ra = Math.tan(Math.PI * 0.25 + (lat) * DEGRAD * 0.5);
      ra = re * sf / Math.pow(ra, sn);
      let theta = lon * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      position._x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      position._y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

      state.gridObj.x = position._x
      state.gridObj.y = position._y
    },
    setNowDeg(state, item) {
      state.nowDeg = item
    },
    setNowVec(state, item) {
      state.nowVec = item
    },
    setNowWsd(state, item) {
      state.nowWsd = item
    },
    setTodayDust(state, item) {
      state.todayDust = item
    },
    setTodayMicroDust(state, item) {
      state.todayMicroDust = item
    },
    setInfoDataList(state, item) {
      state.infoDataList = item
    },
    setTodayWeathersOnTimes(state, item) {
      state.todayWeathersOnTimes = item
    },
    setSubInfoDataList(state, item) {
      state.subInfoDataList = item
    },
    setTenDaysWeather(state, item) {
      state.tenDaysWeather = item
    },
  },
  actions: {
    getThreeDaysOnWeather(context) {
      const x = context.state.gridObj.x
      const y = context.state.gridObj.y
      axios({
        method:'post',
        url: `http://www.kma.go.kr/wid/queryDFS.jsp?gridx=${x}&gridy=${y}`
      }).then(res => {
        const convert = require('xml-js')
        const obj = JSON.parse(convert.xml2json(res.data, { compact: true }))
        const result = obj.wid.body.data
        const resultArr = []
        result.forEach(ele => {
          const _degree = ele.temp._text
          const _time = ele.hour._text + "시"
          let _icon = ""
  
          switch(ele.wfEn._text) {
            case"Clear":
              _icon = "clear.png"
              break;
            case"Partly Cloudy":
              _icon = "partlyCloudy.png"
              break;
            case"Mostly Cloudy":
              _icon = "mostlyCloudy.png"
              break;
            case"Cloudy":
              _icon = "cloudy.png"
              break;
            case"Rain":
              _icon = "rain.png"
              break;
            case"Snow/Rain":
              _icon = "snowRain.png"
              break;
            case"Snow":
              _icon = "snow.png"
              break;
          }
  
          const arr ={
            degree: _degree,
            time: _time,
            icon: _icon
          }
          resultArr.push(arr)
        })
        context.commit("setTodayWeathersOnTimes", resultArr)
      })
    },
    getNowWeatherData(context) {
      const x = context.state.gridObj.x
      const y = context.state.gridObj.y

      let time = moment().format("hhmm")
      if(parseInt(time.substring(2, 4)) < 40) {
        time = parseInt(moment().format("hh")) - 1 + '50'
        if(time.length === 3) {
          time = "0" + time
        }
      } else {
        time = moment().format("hhmm")
      }

      time = "0800"

      const xhr = new XMLHttpRequest()
      const url = ' http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
      let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ KEY
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1')
      queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON')
      queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(moment().format("YYYYMMDD"))
      queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(time)
      queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x)
      queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y)
      xhr.open('GET', url + queryParams)
      xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
            const responseData = JSON.parse(this.responseText).response.body.items.item
            
            responseData.forEach(item => {
              if(item.category === 'T1H') {
                context.commit('setNowDeg', item.obsrValue)
              }
              if(item.category === 'VEC') {
                context.commit('setNowVec', item.obsrValue)
              }
              if(item.category === 'WSD') {
                context.commit('setNowWsd', item.obsrValue)
              }
            })
          }
      };
  
      xhr.send('');
    }
  }
}

export default weather