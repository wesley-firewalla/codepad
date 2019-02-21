import fs from 'fs-extra'
import shell from 'shelljs'

export default {
  value: 'objective-c',
  text: 'Objective-C',
  code: `#import <Foundation/Foundation.h>

int main(int argc, char** argv)
{
  NSLog(@"Hello World!");
}`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.m`, code)
    const command = `cd ${workDir} && clang -framework Foundation code.m -o code && ./code`
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
