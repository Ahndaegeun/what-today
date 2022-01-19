<template>
  <div class="my-page-container">
    <div class="set-password">
      <input type="password" placeholder="비밀번호">
      <input type="password" placeholder="비밀번호 확인">
      <button class="set-pass-btn" type="button">비밀번호 변경</button>
    </div>
    <div class="middle-line"></div>
    <ul class="set-cloth">
      <li v-for="item in clothList" :key="item"
          class="cloth-item">
        <span class="start box">{{ item.start }}</span>
        <span class="dash">~</span>
        <span class="end box">{{ item.end }}</span>
        <span class="cloth-box box"><img :src="require('@/assets/' + item.icon)" alt="cloth"> {{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myPage',
  data() {
    return {
      clothList: [
        {
          start: "-20°",
          end: "-4°",
          icon: 'cloth.png',
          name: '패딩'
        },
        {
          start: "5°",
          end: "8°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "9°",
          end: "11°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "12°",
          end: "16°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "17°",
          end: "19°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "20°",
          end: "22°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "23°",
          end: "27°",
          icon: 'cloth.png',
          name: '반팔'
        },
        {
          start: "28°",
          end: "40°",
          icon: 'cloth.png',
          name: '반팔'
        }
      ]
    }
  }
}
</script>

<style scoped>
.my-page-container {
  height: 100vh;
  background: radial-gradient(195.3% 93.22% at 41.25% 17.43%, #DE9F70 0%, #C94E71 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;
}

.set-password {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.set-password input {
  border: none;
  padding: 5px 10px;
  background: #ffffff40;
  border-radius: 5px;
  color: #ffffff;
  outline: none;
  font-size: 18px;
  margin-bottom: 10px;
}

.set-password input:last-child {
  margin: 0;
}

.set-password input::placeholder {
  color: #ffffff;
}

.set-pass-btn {
  background: #ffffff40;
  color: #ffffff;
  width: fit-content;
  align-self: center;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
}

.middle-line {
  background: #ffffff;
  width: 100%;
  height: 1px;
  margin-bottom: 10px;
}

.set-cloth {
  display: flex;
  flex-direction: column;
}

.cloth-item {
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
}

.cloth-item:last-child {
  margin-bottom: 0;
}

.cloth-item .box {
  background: #ffffff40;
  border-radius: 5px;
  width: 70px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cloth-item .cloth-box {
  justify-content: space-around;
  width: 100px;
}

</style>