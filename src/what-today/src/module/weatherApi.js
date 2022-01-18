import moment from 'moment'
import axios from 'axios'
const KEY = 'g1awEbqZBda7FCRmozw5nrlS7ojS5sPPuOlUtQtUCdsBNAeLPB3tBSemc9YqM%2BwaUbshlgYyrCIVbTPJlhcTLg%3D%3D'

const weather = {
  tudeToGrid(x, y) {
    const lat = y
    const lon = x
    lat, lon
    let grid = {x: 0, y: 0}

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
    x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    grid.x = x
    grid.y = y
    return grid
  },
  getThreeDaysOnWeather(x, y) {
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
      console.log(resultArr)
      return resultArr
    })
  },
  getNowWeatherData(x, y, weather) {
    const xhr = new XMLHttpRequest();
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ KEY; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(moment().format("YYYYMMDD")); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(moment().format("hhmm")); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          const responseData = JSON.parse(this.responseText).response.body.items.item
          const arr = {}
          responseData.forEach(item => {
            if(
              item.category === 'T1H' ||
              item.category === 'VEC' ||
              item.category === 'WSD'
            ) {
              arr[item.category] = item.obsrValue
            }
          })
          weather.data = arr
          console.log(arr)
        }
    };

    xhr.send('');
  }
}

export default weather