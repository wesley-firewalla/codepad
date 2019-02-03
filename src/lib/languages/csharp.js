import fs from 'fs-extra'
import shell from 'shelljs'

const csproj = `<Project Sdk="Microsoft.NET.Sdk">
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <TargetFramework>netcoreapp2.1</TargetFramework>
</PropertyGroup>
</Project>
`
export default {
  value: 'csharp',
  text: 'C#',
  code: `using System;

namespace CodeLife
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}`,
  run: (workDir, code, callback) => {
    fs.outputFileSync(`${workDir}/code.cs`, code)
    fs.outputFileSync(`${workDir}/code.csproj`, csproj)
    const command = `export HOME=${
      window.ENV_HOME
    } && cd ${workDir} && dotnet run`
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
