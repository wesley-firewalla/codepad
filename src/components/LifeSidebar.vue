<template>
  <div>
    <div class="list-group-header">
      <input
        class="form-control"
        type="text"
        v-model="filter.q"
        placeholder="Filter"
      />
    </div>
    <div style="overflow: auto;height: calc(100vh - 93px);">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="item in items"
          :class="{ active: item.id === active_tab.id }"
          @click.prevent="itemClick(item)"
          :key="item.id"
        >
          <div class="name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LifeSidebar',
  computed: {
    ...mapState('life', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab,
      items: state => state.items,
      filter: state => state.filter
    })
  },
  data() {
    return {}
  },
  watch: {
    ['filter.q']() {
      this.filter.offset = 0
      this.filter.limit = 20
      this.fetchItems()
    }
  },
  methods: {
    ...mapActions('life', [
      'fetchItems',
      'viewItemInTab',
      'previewItemInTab',
      'updateQ',
      'deleteItem',
      'updateItem'
    ]),
    itemClick(item) {
      this.viewItemInTab(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-item {
  color: #333;
}
.list-group-item {
  .time {
    color: #8d8d8d;
  }
  &.active .time {
    color: #fff;
  }
}
</style>
