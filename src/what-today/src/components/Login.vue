<template>
  <div class="login-container">
    <div class="login-form">
      <input type="text" placeholder="아이디"/>
      <input type="password" placeholder="비밀번호"/>
      <button type="button">Login</button>
    </div>
    <div class="middle-line"></div>
    <SocialLogin :displayValue="displayValue"/>
    <div class="middle-line"></div>
    <div class="link-wrapper">
      <router-link to="/sign/signUp">회원가입</router-link>
      <router-link to="/sign/find">정보조회</router-link>
    </div>
  </div>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: 'login',
  components: {
    SocialLogin
  },
  data: function (){
    return {
      displayValue: 1,
    };
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: radial-gradient(195.3% 93.22% at 41.25% 17.43%, #DE9F70 0%, #C94E71 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 30px;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.login-form >* {
  background: #ffffff40;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
}

.login-form input:first-child{
  margin-bottom: 20px;
}

.middle-line{
  width: 100%;
  height: 1px;
  background: #ffffff;
  margin-bottom: 10px;
}

.link-wrapper{
  display: flex;
  gap: 28px;
}

input {
  font-size: 18px;
  color: #ffffff;
}

input::placeholder{
  color: #e3e3e3;
}

button {
  font-size: 14px;
  color: #ffffff;
  align-self: center;
  width: 100px;
}

a {
  font-size: 14px;
  line-height: 16px;
  color: #D6D6D6;
}
</style>