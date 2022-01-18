<template>
  <div @click="openAndCloseNav" class="nav-container">
    <nav @click.stop :style="navStyle">
      <ul>
        <li><router-link to="/">홈</router-link></li>
        <li><router-link to="/sign/login">로그인</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "nav",
  data() {
    return  {
      navStyle: {
        padding: "0",
        width: "0",
      }
    }
  },
  methods: {
    ...mapMutations({
      openAndCloseNav: 'nav/openAndCloseNav'
    })
  },
  mounted() {
    this.navStyle.width = '40%'
    this.navStyle.padding = '40px 10px'
  }
}
</script>

<style scoped>
.nav-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #ffffff40;
}

nav {
  background: #CD5E71;
  height: 100%;
  margin-left: auto;
  overflow: hidden;
  transition: all .5s ease-in;
}

ul li:first-child {
  margin-bottom: 10px;
}
</style>