import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'php',
  text: 'PHP',
  code: `<?php
echo 'hello world!';
`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.php`, code)
    const command = `php ${workDir}/code.php`
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
