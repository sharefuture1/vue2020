import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:[]
  },
  mutations: {
    addUser(state,obj){
      state.user.push(obj);
    }
  },
  actions: {
  },
  modules: {
  }
})
