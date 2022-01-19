<template>
  <div class="social-login-container" :style="{'grid-template-columns': `repeat(${displayValue}, 1fr)`}">
    <button class="item kakaotalk">kakaotalk</button>
    <button class="item naver">naver</button>
    <button class="item facebook">facebook</button>
    <button class="item google">google</button>
  </div>
</template>

<script>
export default {
  name: "SocialLogin",
  props: {
    displayValue:Number
  }
};
</script>

<style scoped>
.social-login-container{
  display: grid;
  width: 100%;
  margin-bottom: 10px;
  gap: 10px;
}

.social-login-container button.item {
  border-radius: 5px;
  height: 30px;
  width: 100%;
}

.kakaotalk{
  background: #E9ED3A;
}

.naver{
  background: #3AED8C;
}

.facebook{
  background: #3A62ED;
}

.google{
  background: #ED3A3A;
}
</style>