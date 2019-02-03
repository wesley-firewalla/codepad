<template>
  <multipane class="horizontal-panes" layout="horizontal">
    <div class="sidebar"><code-sidebar /></div>
    <multipane-resizer />
    <div class="main-content">
      <code-tabs />
      <code-content @on-save="onSave" />
      <code-save-name ref="savePrompt" />
    </div>
  </multipane>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Multipane, MultipaneResizer } from '@/components/MultiPane'
import CodeContent from '@/components/CodeContent.vue'
import CodeTabs from '@/components/CodeTabs.vue'
import CodeSidebar from '@/components/CodeSidebar.vue'
import CodeSaveName from '@/components/CodeSaveName.vue'
import Mousetrap from 'mousetrap'

export default {
  name: 'Code',
  components: {
    Multipane,
    MultipaneResizer,
    CodeContent,
    CodeSidebar,
    CodeSaveName,
    CodeTabs
  },
  computed: {
    ...mapState('code', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab
    })
  },
  created() {
    if (this.tabs.length === 0) {
      this.newTab()
    }
    this.fetchItems()
    this.initShortcuts()
  },
  destroyed() {
    Mousetrap.unbind('command+s')
    Mousetrap.unbind('command+t')
    Mousetrap.unbind('command+w')
  },
  methods: {
    ...mapActions('code', [
      'fetchItems',
      'newTab',
      'closeActiveTab',
      'saveActiveTab'
    ]),
    onSave() {
      if (this.active_tab.item_id) {
        this.saveActiveTab()
      } else {
        this.$refs.savePrompt.show()
      }
    },
    initShortcuts() {
      Mousetrap.bind('command+s', () => {
        this.onSave()
      })
      Mousetrap.bind('command+t', () => {
        this.newTab()
      })
      Mousetrap.bind('command+w', () => {
        this.closeActiveTab()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  flex: 1;
  overflow: hidden;
}
.sidebar {
  min-width: 100px;
  width: 200px;
  max-width: 300px;
}
</style>
