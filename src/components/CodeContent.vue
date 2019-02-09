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
          v-model="code"
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
import { mapState, mapActions } from 'vuex'
import { Multipane, MultipaneResizer } from '@/components/MultiPane'
import CodeContentToolbar from '@/components/CodeContentToolbar.vue'
import CodeContentWorkbench from '@/components/CodeContentWorkbench.vue'
import MonacoEditor from '@/components/MonacoEditor'
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
    }),
    code: {
      get() {
        return this.active_tab.code
      },
      set(value) {
        this.setActiveTabCode(value)
        this.$emit('test', 'hi')
      }
    }
  },
  data() {
    return {
      editor: null,
      editorOptions: {
        automaticLayout: true
      }
    }
  },
  mounted() {
    this.editor = this.$refs.editor.getMonaco()
    this.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      this.$emit('on-save')
    })
  },
  methods: {
    ...mapActions('code', ['setActiveTabCode']),
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
