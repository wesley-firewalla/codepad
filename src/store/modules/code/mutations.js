import _ from 'lodash'

export default {
  // Items
  setItems(state, items) {
    state.items = items
  },
  addItems(state, items) {
    for (let item of items) {
      state.items.push(item)
    }
  },
  addItem(state, item) {
    state.items.push(item)
  },
  insertItem(state, item) {
    state.items.splice(0, 0, item)
  },
  deleteItem(state, id) {
    const index = state.items.findIndex(it => it.id === id)
    state.items.splice(index, 1)
  },
  updateItem(state, item) {
    const it = state.items.find(it => it.id === item.id)
    _.assign(it, item)

    const tab = state.tabs.find(it => it.item_id === item.id)
    if (tab) {
      tab.name = item.name
      tab.language = item.language
      tab.code = item.code
    }
  }
}
