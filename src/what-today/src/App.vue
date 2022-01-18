<template>
  <div class="main-container">
    <button class="nav-btn"
            @click="openAndCloseNav">
      <img :src="require('@/assets/' + this.$store.state.nav.navImg)" alt="nav">
    </button>
    <Nav v-if="this.$store.state.nav.isNavOn"/>
    <router-view></router-view>
  </div>
</template>

<script>
import 'minireset.css'
import Nav from './components/Nav.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { 
    Nav
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations({
      openAndCloseNav: 'nav/openAndCloseNav'
    })
  }
}
</script>

<style scoped>
.main-container {
  max-width: 428px;
  min-width: 320px;
  position: relative;
}

.nav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}
</style>
