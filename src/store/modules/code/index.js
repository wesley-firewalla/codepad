import actions from './actions'

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
  actions
}
