import { markdown } from 'markdown'

export default {
  value: 'markdown',
  text: 'Markdown',
  code: `Hello.\n\n* This is markdown.\n* It is fun\n* Love it or leave it.`,
  run: (workDir, code, callback) => {
    const html = markdown.toHTML(code)
    callback({
      output: html
    })
  }
}
