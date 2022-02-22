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
    infoDataList: [
      {
        category: "infoData",
        name: "최고 기온",
        detail: '로드중...',
        time: '로드중...'
      },
      {
        category: "infoData",
        name: "최저 기온",
        detail: '로드중...',
        time: '로드중...'
      },
      {
        category: "cloth",
        name: ["추천 옷"],
        detail: ["../assets/cloth.png", "반팔"],
        time: null
      }
    ],
    todayWeathersOnTimes: [],
    subInfoDataList: [],
    tenDaysWeather: [],
    gridObj: {x: 0, y: 0},
    sensibleTemper: 0,
    maxTemp: 0,
    minTemp: 0,
    maxTime: '',
    minTime: ''
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
    setSensibleTemper(state, item) {
      state.sensibleTemper = item
    },
    setMaxTemp(state, item) {
      state.maxTemp = item
    },
    setMinTemp(state, item) {
      state.minTemp = item
    },
    setMinTime(state, item) {
      state.minTime = item
    },
    setMaxTime(state, item) {
      state.maxTime = item
    }
  },
  actions: {
    getNowWeatherData(context) {
      const x = context.state.gridObj.x
      const y = context.state.gridObj.y

      let time = moment().format("HHmm")
      
      // if(parseInt(time.substring(2, 4)) < 40) {
      //   time = parseInt(moment().format("hh")) - 1 + '50'
      //   if(time.length === 3) {
      //     time = "0" + time
      //   }
      // } else {
      //   time = moment().format("hhmm")
      // }

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
            /*
            T1H 기온
            VEC 풍향
            WSD 풍속
            */
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
            const deg = 13.12+0.6215*context.state.nowDeg-11.37*Math.pow(context.state.nowWsd*3600/1000, 0.16)+0.3965*Math.pow(context.state.nowWsd*3600/1000, 0.16)*context.state.nowDeg
            context.commit('setSensibleTemper', deg.toFixed(1))
          }
      };
  
      xhr.send('');
    },
    getTotalTodayWeatherData(context) {
      const x = context.state.gridObj.x
      const y = context.state.gridObj.y

      if(localStorage.getItem(moment().format("YYYYMMDD").toString()) == null) {
        axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',{
          params: {
            serviceKey : 'g1awEbqZBda7FCRmozw5nrlS7ojS5sPPuOlUtQtUCdsBNAeLPB3tBSemc9YqM+waUbshlgYyrCIVbTPJlhcTLg==',
            pageNo : 1,
            numOfRows : 266,
            dataType : 'JSON',
            base_date : moment().subtract(1, 'day').format('YYYYMMDD'),
            base_time : '2300',
            nx : x,
            ny : y
          }
        }).then(res => {
          console.log(res)
          const data = res.data.response.body.items
          const resultData = []
          for(const item of data.item) {
            if(item.category === 'TMN') {
              resultData.push({
                category: "infoData",
                name: "최고 기온",
                detail: item.fcstValue,
                time: item.fcstTime.substring(0, 2) + ":" + item.fcstTime.substring(2, 4)
              })
            } else if(item.category === 'TMX') {
              resultData.push({
                category: "infoData",
                name: "최고 기온",
                detail: item.fcstValue,
                time: item.fcstTime.substring(0, 2) + ":" + item.fcstTime.substring(2, 4)
              })
            }
            if(resultData.length == 2) break
          }
          resultData.push({
            category: "cloth",
            name: ["추천 옷"],
            detail: ["../assets/cloth.png", "반팔"],
            time: null
          })
          context.commit('setInfoDataList', resultData)
          localStorage.setItem(moment().format("YYYYMMDD").toString(), JSON.stringify(resultData))
        }).catch(err => {
          console.log(err)
        })
      } else {
        context.commit('setInfoDataList', JSON.parse(localStorage.getItem(moment().format("YYYYMMDD").toString())))
      }
      indexedDB.open.bind(123)
      /*
      TMN 일 최저
      TMX 일 최고
      fcstValue, fcstTime
      */
    }
  }
}

export default weather