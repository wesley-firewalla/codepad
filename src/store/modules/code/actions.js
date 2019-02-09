import itemService from '@/lib/services/code-item'
import languages from '@/lib/languages'
import _ from 'lodash'

const createTab = () => {
  const language = languages[0]
  return {
    id: null,
    name: Date.now().toString(),
    title: 'Untitled',
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
  tab.id = item.id
  tab.title = item.title
  tab.origin = tab.code = item.code
  tab.language = item.language
}

export default {
  async fetchItems({ state }) {
    const items = await itemService.findAll(state.filter)
    if (state.filter.offset === 0) {
      state.items = items
    } else {
      for (let item of items) {
        state.items.push(item)
      }
    }
  },
  async deleteItem({ state }, id) {
    await itemService.deleteById(id)
    const index = state.items.findIndex(it => it.id === id)
    state.items.splice(index, 1)
  },
  async updateItem({ state }, item) {
    const id = item.id
    await itemService.update(id, item)

    item = await itemService.findById(id)
    const sItem = state.items.find(it => it.id === id)
    _.assign(sItem, item)
  },
  viewItemInTab({ state }, item) {
    let tab = state.tabs.find(it => it.id === item.id)
    if (tab) {
      tab.is_preview = false
      state.active_tab = tab
    } else {
      tab = createTab()
      setTabByItem(tab, item)
      state.tabs.push(tab)
      state.active_tab = tab
    }
  },
  previewItemInTab({ state }, item) {
    let tab = state.tabs.find(it => it.id === item.id)
    if (tab) {
      state.active_tab = tab
    } else {
      tab = state.tabs.find(it => it.is_preview)
      if (tab) {
        setTabByItem(tab, item)
        state.active_tab = tab
      } else {
        tab = createTab()
        setTabByItem(tab, item)
        tab.is_preview = true
        state.tabs.push(tab)
        state.active_tab = tab
      }
    }
  },
  async saveTab({ state }, tab) {
    tab.origin = tab.code
    if (tab.id) {
      await itemService.update(tab.id, tab)
      const item = await itemService.findById(tab.id)
      const sItem = state.items.find(it => it.id === item.id)
      _.assign(sItem, item)

      const tab = state.tabs.find(it => it.id === item.id)
      if (tab) {
        tab.name = item.name
        tab.language = item.language
        tab.code = item.code
      }
    } else {
      tab.id = await itemService.create(tab)
      const item = await itemService.findById(tab.id)
      state.items.splice(0, 0, item)
    }
  },
  async saveActiveTab({ dispatch, state }, title) {
    if (!_.isUndefined(title)) {
      state.active_tab.title = title
    }

    await dispatch('saveTab', state.active_tab)
  },
  setActiveTabCode({ state }, code) {
    const tab = state.active_tab
    state.active_tab.code = code
    if (tab.is_preview && tab.origin !== code) {
      state.active_tab.is_preview = false
    }
  }
}
