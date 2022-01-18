const nav = {
  namespaced: true,
  state: {
    isNavOn: false,
    navImg: 'navOn.png'
  },
  mutations: {
    openAndCloseNav(state) {
      state.isNavOn = !state.isNavOn
      state.navImg = state.isNavOn ? 'navClose.png' :'navOn.png'
    },
    closeNav(state) {
      state.isNavOn = false
      state.navImg = 'navOn.png'
    }
  },
  actions: {

  }
}

export default nav