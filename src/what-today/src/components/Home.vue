<template>
  <div class="home-container">
    <img src="@/assets/sunny.png" alt="icon" class="weather-icon">

    <div class="degree-and-position">
      <span class="degree" v-text="`${this.$store.state.weather.nowDeg}°`"></span>
      <span class="degree">(체감 {{this.$store.state.weather.sensibleTemper}}°)</span>
      <span class="position">대전 중구</span>
    </div>

    <div class="weather-info-wrap">
      <InfoCard v-for="item in this.$store.state.weather.infoDataList" 
                :key="item"
                :data="item"/>
    </div>

    <div class="sub-info-wrap">
      <InfoCard v-for="item in subInfoDataList" 
                :key="item"
                :data="item"/>
    </div>

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
          detail: this.$store.state.weather.maxTemp,
          time: this.$store.state.weather.maxTime
        },
        {
          category: "infoData",
          name: "최저 기온",
          detail: this.$store.state.weather.minTemp,
          time: this.$store.state.weather.minTime
        },
        {
          category: "cloth",
          name: ["추천 옷"],
          detail: ["../assets/cloth.png", "반팔"],
          time: null
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
    }
  },
  methods: {
    ...mapMutations({
      tudeToGrid: 'weather/tudeToGrid',
      closeNav: 'nav/closeNav'
    }),
    ...mapActions({
      getNowWeatherData: 'weather/getNowWeatherData',
      getTotalTodayWeatherData: 'weather/getTotalTodayWeatherData'
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
        this.getNowWeatherData()
        this.getTotalTodayWeatherData()
      })
    }
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100vh;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
  gap: 10px;
  width: 80%;
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