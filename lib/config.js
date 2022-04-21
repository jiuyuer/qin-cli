const fse = require('fs-extra');
const path = require('path');

const jsonConfig = {
  name: 'qin-cli',
  // mirror: 'https://github.com/jiuyuer/qin-template/archive/refs/heads/main.zip'
  mirror: 'github:jiuyuer/qin-template#main'
};

const configPath = path.resolve(__dirname, '../config.json');

async function defConfig() {
  try {
    await fse.outputJson(configPath, jsonConfig);
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

module.exports = defConfig;
