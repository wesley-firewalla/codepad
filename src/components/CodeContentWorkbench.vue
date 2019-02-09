<template>
  <div style="height: 100%">
    <el-tabs v-model="active_panel" type="border-card" class="workbench-tabs">
      <el-tab-pane
        :key="item"
        v-for="item in panels"
        :label="item.toUpperCase()"
        :name="item"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="execute-result can-select">
      <div
        class="can-select"
        :class="{ 'markdown-body': active_tab.language === 'markdown' }"
        v-if="active_tab.active_panel === 'output'"
        v-html="active_tab.output"
      ></div>
      <template v-if="active_tab.active_panel === 'debug'">{{
        active_tab.command
      }}</template>
    </div>
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
  padding: 15px;
  height: calc(100% - 40px);
}
.el-tabs--border-card {
  border-left: none;
  border-bottom: none;
  border-right: none;
  box-shadow: none;
}
</style>
