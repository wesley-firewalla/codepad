import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'go',
  text: 'Go',
  code: `package main
  
import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.go`, code)
    const command = `/usr/local/go/bin/go run ${workDir}/code.go`
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
