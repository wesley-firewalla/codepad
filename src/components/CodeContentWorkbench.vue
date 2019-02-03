<template>
  <div>
    <ul class="nav-tabs" style="margin-top: -5px;">
      <li
        class="nav-item"
        v-for="item in panels"
        :key="item"
        @click="makeWindowActive(item)"
      >
        <a
          class="nav-link"
          :class="{ active: item === active_tab.active_panel }"
          >{{ item }}</a
        >
      </li>
    </ul>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CodeContentWorkbench',
  computed: {
    ...mapState('code', {
      active_tab_name: state => state.active_tab_name
    }),
    active_tab: {
      get() {
        return this.$store.state.code.tabs.find(
          it => it.name === this.active_tab_name
        )
      }
    },
  },
  data() {
    return {
      panels: ['output', 'debug']
    }
  },
  methods: {
    makeWindowActive(item) {
      this.active_tab.active_panel = item
    }
  }
}
</script>

<style lang="scss" scoped>
.execute-result {
  padding: 0.5rem 0.75rem;
  white-space: pre-wrap;
  overflow: auto;
  height: calc(100% - 32px);
}
</style>
