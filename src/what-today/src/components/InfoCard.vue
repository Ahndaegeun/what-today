<template>

  <div class="info-card-container" v-if="data.category === 'infoData'">
    <div class="title">{{data.name}}</div>
    <div class="detail">{{data.detail}}</div>
    <div class="time">{{data.time}}</div>
  </div>

  <div class="info-card-container cloth" v-if="data.category === 'cloth'">
    <div class="title">{{data.name[0]}}</div>
    <img class="detail" src="../assets/cloth.png" alt="clothIcon">
    <div class="title">{{data.name[1]}}</div>
    <div class="detail">{{data.detail[1]}}</div>
  </div>

  <div class="info-card-container wind" v-if="data.category === 'wind'">
    <div class="title">{{data.name}}</div>
    <img src="@/assets/arrow.png" alt="wind-icon" class="wind-icon">
    <div class="detail">{{data.detail[1]}}</div>
  </div>

  <div class="info-card-container rain" v-if="data.category === 'rain'">
    <div class="title">{{data.name}}</div>
    <div class="detail">{{data.detail}}</div>
  </div>

  <div class="info-card-container dust" v-if="data.category === 'dust'">
    <div class="title">{{data.name}}</div>
    <div class="detail">{{data.detail[0]}}</div>
    <div class="detail">{{data.detail[1]}}</div>
  </div>

</template>

<script>
export default {
  name: "InfoCard",
  props: {
    data: Object
  }
}
</script>

<style scoped>
.info-card-container {
  background: #ffffff40;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.info-card-container:nth-child(1),
.info-card-container:nth-child(2),
.cloth {
  width: 30%;
}


.info-card-container:nth-child(1) .title,
.info-card-container:nth-child(2) .title {
  font-size: 14px;
  margin-bottom: 10px;
}

.info-card-container:nth-child(1) .detail,
.info-card-container:nth-child(2) .detail {
  font-size: 22px;
}

.info-card-container:nth-child(3){
  justify-content: space-around;
}

.info-card-container img.detail{
  width: 20px;
}

.info-card-container.wind,
.info-card-container.rain,
.info-card-container.dust {
  justify-content: space-around;
  width: 100%;
  font-size: 12px;
}

.info-card-container.wind div.title,
.info-card-container.rain div.title,
.info-card-container.dust div.title {
  font-size: 12px;
}

</style>