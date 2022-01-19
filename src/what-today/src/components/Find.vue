<template>
  <div class="find-container">
    <FindForm :formValue="false"/>
    <FindForm :formValue="true"/>
    <div class="middle-line"></div>
    <div class="link-wrapper">
      <router-link to="/sign/signup">회원가입</router-link>
      <router-link to="/sign/login">로그인</router-link>
    </div>
  </div>
</template>

<script>
import FindForm from "@/components/FindForm";
export default {
  name: 'find',
  components: {
    FindForm
  },
  data: function (){
    return {
    };
  }
}
</script>

<style scoped>
.find-container{
  width: 100%;
  height: 100vh;
  background: radial-gradient(195.3% 93.22% at 41.25% 17.43%, #DE9F70 0%, #C94E71 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 30px;
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