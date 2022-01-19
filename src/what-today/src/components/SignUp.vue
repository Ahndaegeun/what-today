<template>
  <div class="signUp-container">
    <div class="signUp-form">
      <div class="id-wrapper">
        <input class="user-id" type="text" placeholder="아이디"/>
        <span>영어와 숫자를 조합하여 6~20자를 입력한 주세요.</span>
        <div class="check-img">check</div>
      </div>
      <div class="password-wrapper">
        <input class="user-password" type="password" placeholder="비밀번호"/>
        <span>영어 대소문자,숫자를 조합하여 6~20자를 입력해 주세요.</span>
      </div>
      <div class="password-check-wrapper">
        <input class="user-password-check" type="password" placeholder="비밀번호 확인"/>
        <span>비밀번호를 다시한번 입력해 주세요.</span>
      </div>
      <div class="email-wrapper">
        <input type="text" placeholder="이메일"/>
        <span>@</span>
        <input type="text" placeholder="abcd.com"/>
      </div>
      <div class="otp-wrapper">
        <input type="text" placeholder="인증번호"/>
      </div>
      <div class="name-wrapper">
        <input type="text" placeholder="이름"/>
      </div>
      <div class="birth-wrapper">
        <input type="text" placeholder="생년월일"/>
      </div>
      <button type="button">회원가입</button>
    </div>
    <div class="middle-line"></div>
    <SocialLogin :displayValue="displayValue"/>
    <div class="middle-line"></div>
    <div class="link-wrapper">
      <router-link to="/sign/find">정보조회</router-link>
      <router-link to="/sign/login">로그인</router-link>
    </div>
  </div>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: 'signup',
  components: {
    SocialLogin
  },
  data: function (){
    return {
      displayValue: 2,
    };
  }
}
</script>

<style scoped>
.signUp-container {
  width: 100%;
  height: 100vh;
  background: radial-gradient(195.3% 93.22% at 41.25% 17.43%, #DE9F70 0%, #C94E71 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 30px;
}

.signUp-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.signUp-form [class $= "-wrapper"]{
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.signUp-form [class ^= "user"]{
  margin-bottom: 5px;
}

.signUp-form .email-wrapper{
  flex-direction: row;
}

.signUp-form .email-wrapper span{
  text-align: center;
  text-indent: 0px;
  font-size: 18px;
}

.signUp-form button ,
.signUp-form input{
  background: #ffffff40;
  border-radius: 5px;
  padding: 5px 10px;
}

.signUp-form span{
  text-indent: 15px;
  color: #ffffff;
  font-size: 9px;
}

.check-img{
  position: absolute;
  right: 50px;
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
  width: 100%;
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