import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'javascript',
  text: 'JavaScript',
  code: `console.log('Hello, world')`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.js`, code)
    const command = `node ${workDir}/code.js`
    shell.exec(command, (code, stdout, stderr) => {
      callback(
        {
          output: stdout,
          command
        },
        stderr
      )
    })
  }
}
