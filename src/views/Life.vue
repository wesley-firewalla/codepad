<template>
  <multipane class="horizontal-panes" layout="horizontal">
    <div class="sidebar"><life-sidebar /></div>
    <multipane-resizer />
    <div class="main-content">
      <life-tabs />
      <life-content />
    </div>
  </multipane>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Multipane, MultipaneResizer } from '@/components/MultiPane'
import LifeContent from '@/components/LifeContent.vue'
import LifeTabs from '@/components/LifeTabs.vue'
import LifeSidebar from '@/components/LifeSidebar.vue'
import Mousetrap from 'mousetrap'

export default {
  name: 'Life',
  components: {
    Multipane,
    MultipaneResizer,
    LifeContent,
    LifeSidebar,
    LifeTabs
  },
  computed: {
    ...mapState('life', {
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
    Mousetrap.unbind('command+w')
  },
  methods: {
    ...mapActions('life', ['fetchItems', 'newTab', 'closeActiveTab']),
    initShortcuts() {
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
