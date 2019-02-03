<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import electron from 'electron'

export default {
  name: 'App',
  methods: {
    toggleWindowSize() {
      const win = electron.remote.getCurrentWindow()
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  margin: 0.5rem;
  .btn {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
