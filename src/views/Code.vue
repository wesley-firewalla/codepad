<template>
  <multipane class="horizontal-panes" layout="horizontal">
    <div class="sidebar"><code-sidebar /></div>
    <multipane-resizer />
    <div class="main-content">
      <el-tabs
        v-model="active_tab_name"
        type="card"
        editable
        @tab-add="addTab"
        @tab-remove="removeTab"
        @tab-click="clickTab"
        class="top-tabs"
      >
        <el-tab-pane
          :key="item.name"
          v-for="item in tabs"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
      <code-content @on-save="onSave" />
    </div>
  </multipane>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Multipane, MultipaneResizer } from '@/components/MultiPane'
import CodeContent from '@/components/CodeContent.vue'
import CodeSidebar from '@/components/CodeSidebar.vue'
import Mousetrap from 'mousetrap'
import languages from '@/lib/languages'

const createTab = () => {
  const language = languages[0]
  return {
    name: Date.now().toString(),
    item_id: null,
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

export default {
  name: 'Code',
  components: {
    Multipane,
    MultipaneResizer,
    CodeContent,
    CodeSidebar
  },
  computed: {
    ...mapState('code', {
      tabs: state => state.tabs,
      active_tab: state => state.active_tab
    }),
    active_tab_name: {
      get() {
        return this.active_tab.name
      },
      set(value) {
        this.$store.state.code.active_tab = this.tabs.find(
          it => it.name === value
        )
      }
    }
  },
  created() {
    if (this.tabs.length === 0) {
      this.addTab()
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
    ...mapActions('code', ['fetchItems', 'saveActiveTab']),
    addTab() {
      const tab = createTab()
      this.tabs.push(tab)
      this.active_tab_name = tab.name
    },
    removeTab(targetName) {
      const index = this.tabs.findIndex(it => it.name === targetName)
      const closingTab = this.tabs[index]
      if (closingTab.name === this.active_tab.name) {
        if (this.tabs.length > 1) {
          const prevTab = this.tabs[index === 0 ? index + 1 : index - 1]
          this.active_tab.name = prevTab.name
        }
      }

      this.tabs.splice(index, 1)
    },
    clickTab(tab) {
      this.active_tab_name = tab.name
    },
    onSave() {
      if (this.active_tab.item_id) {
        this.saveActiveTab()
      } else {
        this.$prompt('', 'Save As', {
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          inputValue: 'Untitled',
          inputPattern: /.+/,
          inputErrorMessage: 'Required'
        }).then(({ value }) => {
          this.saveActiveTab(value)
        })
      }
    },
    initShortcuts() {
      Mousetrap.bind('command+s', () => {
        this.onSave()
      })
      Mousetrap.bind('command+t', () => {
        this.addTab()
      })
      Mousetrap.bind('command+w', () => {
        this.removeTab(this.active_tab_name)
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
