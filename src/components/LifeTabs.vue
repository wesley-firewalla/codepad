<template>
  <div class="tab-group">
    <div
      class="tab-item"
      v-for="(item, index) in tabs"
      :class="{ active: item.id === active_tab.id }"
      :key="item.id"
      @click="activateTab(item)"
    >
      <span
        v-if="tabs.length > 1"
        class="icon icon-cancel icon-close-tab"
        @click.stop="closeTab(index)"
      />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LifeTabs',
  computed: {
    ...mapState('life', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab
    })
  },
  methods: {
    ...mapActions('life', ['closeTab', 'newTab', 'activateTab'])
  }
}
</script>
