<template>
  <div>
    <el-tabs v-model="active_panel" type="border-card">
      <el-tab-pane
        :key="item"
        v-for="item in panels"
        :label="item"
        :name="item"
      >
        <div class="execute-result can-select">
          <div
            class="can-select"
            :class="{ 'markdown-body': active_tab.language === 'markdown' }"
            v-if="active_tab.active_panel === 'output'"
            v-html="active_tab.output"
          />
          <template v-if="active_tab.active_panel === 'debug'">{{
            active_tab.command
          }}</template>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CodeContentWorkbench',
  computed: {
    ...mapState('code', {
      active_tab: state => state.active_tab
    }),
    active_panel: {
      get() {
        return this.active_tab.active_panel
      },
      set(value) {
        this.active_tab.active_panel = value
      }
    }
  },
  data() {
    return {
      panels: ['output', 'debug']
    }
  }
}
</script>

<style lang="scss" scoped>
.execute-result {
  white-space: pre-wrap;
  overflow: auto;
  height: calc(100% - 32px);
}
.el-tabs--border-card {
  border-left: none;
  border-bottom: none;
  border-right: none;
  box-shadow: none;
}
</style>
