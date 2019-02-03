import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    tabs: [],
    active_tab: null,
    items: [],
    filter: {
      q: '',
      offset: 0,
      limit: 20
    }
  },
  mutations,
  actions
}
