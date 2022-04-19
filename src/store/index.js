import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rbServer: undefined,
    serverConnected: false,
    isSlamRunning: false,
    isNavRunning: false,
    rosIP: "",
    selectedMapName: "",
    selectedWayPoints: [],
  },
  getters: {
    getRbServer: (state) => state.rbServer,
    getServerConnected: (state) => state.serverConnected,
    getIsSlamRunning: (state) => state.isSlamRunning,
    getIsNavRunning: (state) => state.isNavRunning,
    getRosIP: (state) => state.rosIP, 
    getSelectedMapName: (state) => state.selectedMapName,
    getSelectedWayPoints: (state) => state.selectedWayPoint,
  },
  mutations: {
    setRbServer(state, data) {
      state.rbServer = data;
    },
    setServerConnected(state, data) {
      state.serverConnected = data;
    },
    setIsSlamRunning(state, data) {
      state.isSlamRunning = data;
    },
    setIsNavRunning(state, data) {
      state.isNavRunning = data;
    },
    setRosIP(state, data){
      state.rosIP = data;
    },
    setSelectedMapName(state, data){
      state.selectedMapName = data;
    },
    setSelectedWayPoints(state, data){
      state.selectedWayPoint = data;
    }
  },
  actions: {},
  modules: {},
})
