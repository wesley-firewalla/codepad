<template>
  <div>
    <div class="list-group-header">
      <el-input v-model="filter.q" size="small" placeholder="Filter"></el-input>
    </div>
    <div style="overflow: auto;height: calc(100vh - 93px);">
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="item in items"
          :class="{ active: item.id === active_tab.item_id }"
          @click.prevent="itemClick(item)"
          @contextmenu.prevent="showMenu(item)"
          :key="item.id"
        >
          <template v-if="editing_item_id !== item.id">
            <div class="title">{{ item.title }}</div>
            <div class="time">{{ item.updated_at | localTime }}</div>
          </template>
          <input
            type="text"
            class="input-item form-control"
            :value="item.title"
            v-else
            :ref="'input_item_' + item.id"
            @focus="$event.target.select()"
            @keypress.enter="saveTitle(item, $event)"
            @blur="saveTitle(item, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import contextmenu from '@/lib/contextmenu'

export default {
  name: 'CodeSidebar',
  computed: {
    ...mapState('code', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab,
      items: state => state.items,
      filter: state => state.filter
    })
  },
  data() {
    return {
      editing_item_id: null,
      item_clicks: {},
      item_click_timers: {}
    }
  },
  watch: {
    ['filter.q']() {
      this.filter.offset = 0
      this.filter.limit = 20
      this.fetchItems()
    }
  },
  methods: {
    ...mapActions('code', [
      'fetchItems',
      'viewItemInTab',
      'previewItemInTab',
      'updateQ',
      'deleteItem',
      'updateItem'
    ]),
    itemClick(item) {
      if (item.id === this.editing_item_id) {
        return
      }
      this.item_clicks[item.id] = (this.item_clicks[item.id] || 0) + 1
      if (this.item_clicks[item.id] === 1) {
        this.item_click_timers[item.id] = setTimeout(() => {
          this.previewItemInTab(item)
          this.item_clicks[item.id] = 0
        }, 200)
      } else {
        clearTimeout(this.item_click_timers[item.id])
        this.viewItemInTab(item)
        this.item_clicks[item.id] = 0
      }
    },

    showMenu(item) {
      contextmenu.show([
        {
          label: 'Rename',
          click: () => {
            this.editing_item_id = item.id
            this.$nextTick(() => {
              this.$refs['input_item_' + item.id][0].focus()
            })
          }
        },
        { type: 'separator' },
        {
          label: 'Delete',
          click: () => {
            this.deleteItem(item.id)
          }
        }
      ])
    },
    saveTitle(item, e) {
      let title = e.target.value
      if (title === '') {
        title = item.title
      }

      this.editing_item_id = null
      this.updateItem({
        id: item.id,
        title
      })
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
