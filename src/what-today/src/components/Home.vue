<template>
  <div class="home-container">
    <img src="@/assets/sunny.png" alt="icon" class="weather-icon">

    <div class="degree-and-position">
      <span class="degree" v-text="`${this.$store.state.weather.nowDeg}°`"></span>
      <span class="degree">(체감 -2°)</span>
      <span class="position">대전 중구</span>
    </div>

    <div class="three-day-btns">
      <button class="yesterday" type="button">어제</button>
      <button class="today clicked" type="button">오늘</button>
      <button class="tomorrow" type="button">내일</button>
    </div>

    <div class="weather-info-wrap">
      <InfoCard v-for="item in infoDataList" 
                :key="item"
                :data="item"/>
    </div>

    <ul class="weather-on-times">
      <li v-for="item in this.$store.state.weather.todayWeathersOnTimes" 
          :key="item">
        <div class="time">{{item.time}}</div>
        <img src="@/assets/cloud.png" alt="icon" class="icon">
        <div class="degree">{{item.degree}}</div>
      </li>
    </ul>

    <div class="sub-info-wrap">
      <InfoCard v-for="item in subInfoDataList" 
                :key="item"
                :data="item"/>
    </div>

    <ul class="week-weather">
      <li v-for="item in tenDaysWeather"
          :key="item">
        <span class="day-name">{{item.name}}</span>
        <img src="@/assets/cloud.png" alt="icon" class="day-weather-icon">
        <div class="day-detail-wrap">
          <span>최고 {{item.detail.top}}</span>
          <span>최저 {{item.detail.bottom}}</span>
          <span>풍속 {{item.detail.wind}}</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import InfoCard from './InfoCard.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "Home",
  components: {
    InfoCard
  },
  data() {
    return {
      nowDeg: 0,
      nowVec: 0,
      nowWsd: 0,
      infoDataList: [
        {
          category: "infoData",
          name: "최고 기온",
          detail: "0°",
          time: "14:00"
        },
        {
          category: "infoData",
          name: "최저 기온",
          detail: "-5°",
          time: "04:00"
        },
        {
          category: "cloth",
          name: ["추천 옷", "체감 온도"],
          detail: ["../assets/cloth.png", "-5°"],
          time: null
        }
      ],
      todayWeathersOnTimes: [
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        },
        {
          time: "6시",
          icon: "cloud",
          degree: "3°"
        }
      ],
      subInfoDataList: [
        {
          category: "wind",
          name: "풍속 / 풍향",
          detail: ["북서", "2m/s"],
        },
        {
          category: "rain",
          name: "강수량",
          detail: "0mm",
        },
        {
          category: "dust",
          name: "미세먼지",
          detail: ["177㎍/m³", "매우나쁨"],
        },
        {
          category: "dust",
          name: "초미세먼지",
          detail: ["177㎍/m³", "매우나쁨"],
        }
      ],
      tenDaysWeather: [
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
        {
          name: "화",
          icon: "cloud",
          detail: {
            top: "10°",
            bottom: "-2°",
            wind: "5 m/s"
          }
        },
      ]
    }
  },
  methods: {
    ...mapMutations({
      tudeToGrid: 'weather/tudeToGrid',
      closeNav: 'nav/closeNav'
    }),
    ...mapActions({
      getThreeDaysOnWeather: 'weather/getThreeDaysOnWeather',
      getNowWeatherData: 'weather/getNowWeatherData'
    })
  },
  mounted() {
    this.closeNav()
    let x = 0;
    let y = 0;
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        y = position.coords.latitude
        x = position.coords.longitude
        this.tudeToGrid({_x: x, _y: y})
        this.getThreeDaysOnWeather()
        this.getNowWeatherData()
      })
    }
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  background: radial-gradient(195.3% 93.22% at 41.25% 17.43%, #DE9F70 0%, #C94E71 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.weather-icon {
  width: 60px;
  margin-bottom: 10px;
}

.degree-and-position {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 20px;
}

.degree-and-position .degree:first-child {
  font-size: 26px;
}

.degree-and-position .degree:nth-child(2) {
  font-size: 14px;
  margin-bottom: 10px;
}

.three-day-btns {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.three-day-btns button {
  color: rgb(192, 192, 192);
  font-size: 12px;
}

.three-day-btns button.clicked {
  color: #fff;
}

.weather-info-wrap {
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-bottom: 20px;
}

.weather-on-times {
  display: grid;
  grid-template-columns: repeat(12, 60px);
  grid-auto-columns: 60px;
  width: 80%;
  overflow-x: scroll;
  background: #ffffff40;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 20px;
}

.weather-on-times li {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding: 5px 10px;
}

.weather-on-times li .time {
  margin-bottom: 5px;
}

.weather-on-times li .icon {
  margin-bottom: 5px;
}

.sub-info-wrap {
  display: flex;
  margin-bottom: 20px;
  width: 80%;
  justify-content: space-between;
}

.week-weather {
  background: #ffffff40;
  width: 80%;
  padding: 10px;
  border-radius: 5px;
}

.week-weather li {
  display: flex;
  margin-bottom: 5px;
  color: #fff;
  justify-content: space-between;
  font-size: 16px;
}

.week-weather li:last-child {
  margin: 0;
}

.day-detail-wrap {
  width: 70%;
}

</style>