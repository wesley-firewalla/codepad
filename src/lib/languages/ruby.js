import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'ruby',
  text: 'Ruby',
  code: `puts "Hello World"`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.rb`, code)
    const command = `ruby ${workDir}/code.rb`
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
