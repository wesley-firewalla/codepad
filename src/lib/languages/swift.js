import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'swift',
  text: 'Swift',
  code: `print("Hello, World!")`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.swift`, code)
    const command = `swift ${workDir}/code.swift`
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
