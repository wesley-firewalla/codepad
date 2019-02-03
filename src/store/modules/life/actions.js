import itemService from '@/lib/services/life-item'

const createTab = () => {
  return {
    id: 1,
    name: 'Unicode Text Convertor',
    key: 'unicode_text_convertor'
  }
}

const setTabByItem = (tab, item) => {
  tab.id = item.id
  tab.name = item.name
  tab.key = item.key
}

export default {
  async fetchItems({ commit, state }) {
    const items = await itemService.findAll(state.filter)
    if (state.filter.offset === 0) {
      commit('setItems', items)
    } else {
      commit('addItems', items)
    }
  },
  async deleteItem({ commit }, id) {
    await itemService.deleteById(id)
    commit('deleteItem', id)
  },
  async updateItem({ commit }, item) {
    const id = item.id
    await itemService.update(id, item)
    commit('updateItem', await itemService.findById(id))
  },
  newTab({ commit }) {
    commit('addTab', createTab())
  },
  viewItemInTab({ commit, state }, item) {
    let tab = state.tabs.find(it => it.id === item.id)
    if (tab) {
      tab.is_preview = false
      commit('setActiveTab', tab)
    } else {
      tab = createTab()
      setTabByItem(tab, item)
      commit('addTab', tab)
    }
  },
  previewItemInTab({ commit, state }, item) {
    let tab = state.tabs.find(it => it.id === item.id)
    if (tab) {
      commit('setActiveTab', tab)
    } else {
      tab = state.tabs.find(it => it.is_preview)
      if (tab) {
        setTabByItem(tab, item)
        commit('setActiveTab', tab)
      } else {
        tab = createTab()
        setTabByItem(tab, item)
        tab.is_preview = true
        commit('addTab', tab)
      }
    }
  },
  closeTab({ commit, state }, index) {
    if (state.tabs.length === 0) {
      return
    }
    const tab = state.tabs[index]
    if (tab.id === state.active_tab.id) {
      commit('setActiveTab', state.tabs[index === 0 ? index + 1 : index - 1])
    }

    commit('removeTab', index)
  },
  closeActiveTab({ dispatch, state }) {
    const index = state.tabs.findIndex(it => it.id === state.active_tab.id)
    dispatch('closeTab', index)
  },
  activateTab({ commit }, tab) {
    commit('setActiveTab', tab)
  }
}
