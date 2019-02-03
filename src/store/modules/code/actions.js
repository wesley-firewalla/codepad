import itemService from '@/lib/services/code-item'
import languages from '@/lib/languages'
import _ from 'lodash'

const createTab = () => {
  const language = languages[0]
  return {
    id: Date.now(),
    item_id: null,
    name: 'Untitled',
    output: '',
    command: '',
    active_panel: 'output',
    is_running: false,
    language: language.value,
    origin: '',
    code: language.code,
    is_preview: false
  }
}

const setTabByItem = (tab, item) => {
  tab.item_id = item.id
  tab.name = item.name
  tab.origin = tab.code = item.code
  tab.language = item.language
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
    let tab = state.tabs.find(it => it.item_id === item.id)
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
    let tab = state.tabs.find(it => it.item_id === item.id)
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
  async saveTab({ commit }, tab) {
    tab.origin = tab.code
    if (tab.item_id) {
      await itemService.update(tab.item_id, tab)
      commit('updateItem', await itemService.findById(tab.item_id))
    } else {
      tab.item_id = await itemService.create(tab)
      commit('insertItem', await itemService.findById(tab.item_id))
    }
  },
  async saveActiveTab({ dispatch, state }, name) {
    if (!_.isUndefined(name)) {
      state.active_tab.name = name
    }

    await dispatch('saveTab', state.active_tab)
  },
  activateTab({ commit }, tab) {
    commit('setActiveTab', tab)
  }
}
