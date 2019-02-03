<template>
  <div class="top-toolbar">
    <button class="btn btn-default" @click="play">
      <span class="icon icon-play" title="Run" v-if="!active_tab.is_running" />
      <span class="icon icon-stop" title="Stop" v-else />
    </button>
    <label class="label-language">Language</label>
    <select
      :value="active_tab.language"
      @input="updateLanguage"
      class="form-control select-languages"
    >
      <option v-for="item in languages" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
    <span
      class="icon icon-book pull-right"
      v-if="active_tab.language === 'go'"
      @click="showBook"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import languages from '@/lib/languages'
import shell from 'shelljs'
import path from 'path'
import { format as formatUrl } from 'url'

export default {
  name: 'CodeContentToolbar',
  computed: {
    ...mapState('code', {
      active_tab: state => state.active_tab
    })
  },
  data() {
    return {
      languages
    }
  },
  methods: {
    updateLanguage(e) {
      const language = e.target.value
      this.active_tab.language = language
      const defaultCode = this.languages.find(it => it.value === language).code
      this.active_tab.code = defaultCode
    },
    play() {
      this.active_tab.is_running = true
      const workDir = `/tmp/codelife/${this.active_tab.language}`
      shell.mkdir('-p', workDir)
      this.languages
        .find(it => it.value === this.active_tab.language)
        .run(workDir, this.active_tab.code, (result, error) => {
          this.active_tab.output = error || result.output
          this.active_tab.command = result.command || ''
          this.active_tab.is_running = false
        })
    },
    showBook() {
      let url = `http://localhost:8080/docs/${this.active_tab.language}/`
      if (process.env.NODE_ENV === 'production') {
        url = formatUrl({
          pathname: path.join(__dirname, url),
          protocol: 'file',
          slashes: true
        })
      }

      window.open(url, 'doc', 'titleBarStyle="",width=1024,height=800')
    }
  }
}
</script>

<style lang="scss" scoped>
.select-languages {
  width: auto;
}
.top-toolbar {
  flex-wrap: nowrap;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
.label-language {
  vertical-align: middle;
  margin: 0 1rem 0 1rem;
}
.icon-book {
  font-size: 16px;
}
</style>
