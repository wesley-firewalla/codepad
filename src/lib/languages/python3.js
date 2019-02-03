import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'python',
  text: 'Python 3',
  code: `print('hello world')`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.py`, code)
    const command = `python3 ${workDir}/code.py`
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
