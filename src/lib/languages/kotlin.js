import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'kotlin',
  text: 'Kotlin',
  code: `fun main(args: Array<String>) {
  println("Hello, World!")
}`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.kt`, code)
    const command = `cd ${workDir} && kotlinc code.kt -include-runtime -d code.jar && java -jar code.jar`
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
