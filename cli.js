#! /usr/bin/env node

console.log('qin-cli working~');

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Your name',
      default: 'qin-cli'
    }
  ])
  .then(answers => {
    // 打印互用输入结果
    console.log(answers);
    // 模版文件目录
    const destUrl = path.join(__dirname, 'templates');
    // 生成文件目录
    // process.cwd() 对应控制台所在目录
    const cwdUrl = process.cwd();
    // 从模版目录中读取文件
    fs.readdir(destUrl, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        // 使用 ejs 渲染对应的模版文件
        // renderFile（模版文件地址，传入渲染数据）
        ejs.renderFile(path.join(destUrl, file), answers).then(data => {
          // 生成 ejs 处理后的模版文件
          fs.writeFileSync(path.join(cwdUrl, file), data);
        });
      });
    });
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
