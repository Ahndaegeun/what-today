<template>
  <div class="find-form">
    <div v-if="formValue" class="id-wrapper">
      <input class="user-id" type="text" placeholder="아이디"/>
    </div>
    <div class="email-wrapper">
      <input type="text" placeholder="이메일"/>
      <span>@</span>
      <input type="text" placeholder="abcd.com"/>
    </div>
    <div class="name-wrapper">
      <input type="text" placeholder="이름"/>
    </div>
    <div class="birth-wrapper">
      <input type="text" placeholder="생년월일"/>
    </div>
    <span v-if="!formValue">아이디 : ssss</span>
    <button v-if="!formValue" type="button">아이디 찾기</button>
    <button v-if="formValue" type="button">비밀번호 초기화</button>
  </div>
</template>

<script>
export default {
  name: "FindForm",
  props: {
    formValue:Boolean
  }
}
</script>

<style scoped>

.find-form [class $= "-wrapper"]{
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.find-form .email-wrapper{
  flex-direction: row;
}

.find-form .email-wrapper span{
  text-align: center;
  text-indent: 0px;
  font-size: 18px;
}

.find-form button ,
.find-form input{
  background: #ffffff40;
  border-radius: 5px;
  padding: 5px 10px;
}

.find-form span{
  color: #ffffff;
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 5px;
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
  display: block;
  margin: 0 auto 35px;
  font-size: 14px;
  padding: 5px 10px;
  color: #ffffff;
  align-self: center;
}
</style>