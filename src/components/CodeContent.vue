<template>
  <div>
    <code-content-toolbar />
    <multipane
      class="vertical-panes"
      @paneResize="vertialPaneResize"
      layout="vertical"
    >
      <div :style="{ minHeight: '100px', height: '60%' }">
        <monaco-editor
          ref="editor"
          class="code-editor"
          v-model="active_tab.code"
          :options="editorOptions"
          :language="active_tab.language"
        />
      </div>
      <multipane-resizer />
      <div :style="{ minHeight: '50px', flex: 1 }">
        <CodeContentWorkbench />
      </div>
    </multipane>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Multipane, MultipaneResizer } from '@/components/MultiPane'
import CodeContentToolbar from '@/components/CodeContentToolbar.vue'
import CodeContentWorkbench from '@/components/CodeContentWorkbench.vue'
import MonacoEditor from '@/components/MonacoEditor'
import languages from '@/lib/languages'
import * as monaco from 'monaco-editor'

export default {
  name: 'CodeContent',
  components: {
    Multipane,
    MultipaneResizer,
    CodeContentToolbar,
    CodeContentWorkbench,
    MonacoEditor
  },
  computed: {
    ...mapState('code', {
      active_tab: state => state.active_tab
    })
  },
  data() {
    return {
      editor: null,
      editorOptions: {
        automaticLayout: true
      },
      languages
    }
  },
  mounted() {
    this.editor = this.$refs.editor.getMonaco()
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.$emit('on-save')
    })
  },
  watch: {
    ['active_tab.code']() {
      const tab = this.active_tab
      if (tab.is_preview && tab.origin !== tab.code) {
        tab.is_preview = false
      }
    }
  },
  methods: {
    vertialPaneResize() {
      this.editor.layout()
    }
  }
}
</script>

<style lang="scss" scoped>
.code-editor {
  width: 100%;
  height: 100%;
}
.vertical-panes {
  height: calc(100vh - 7rem);
}
</style>
