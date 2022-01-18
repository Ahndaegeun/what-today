<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'sign',
  methods: {
    ...mapMutations({
      closeNav: 'nav/closeNav'
    })
  },
  mounted() {
    this.closeNav()
  }
}
</script>

<style>

</style>