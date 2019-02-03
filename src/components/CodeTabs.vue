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
      <span :class="{ 'tab-preview': item.is_preview }">{{ item.name }}</span>
      <span v-if="item.origin !== item.code">*</span>
    </div>
    <div class="tab-item tab-item-fixed" @click="newTab">
      <span class="icon icon-plus" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CodeTabs',
  computed: {
    ...mapState('code', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab
    })
  },
  methods: {
    ...mapActions('code', ['closeTab', 'newTab', 'activateTab'])
  }
}
</script>

<style lang="scss" scoped>
.tab-preview {
  font-style: italic;
}
</style>
