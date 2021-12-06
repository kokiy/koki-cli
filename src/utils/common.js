// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const ora = require('ora')
const mkdirp = require('mkdirp')
const path = require('path')

const { promisify } = require('util');
const downloadGit = require('download-git-repo');
const downloadGitPromise = promisify(downloadGit);

const mapActions = {
  create: {
    alias: 'c', //别名
    description: '创建一个项目', // 描述
    examples: [ //用法
      'koki-cli create <project-name>'
    ]
  },
  '*': {
    alias: '', //别名
    description: 'command not found', // 描述
    examples: [] //用法
  }
}

const fnLoadingByOra = async (fn, message) => {
  const spinner = ora(message);
  spinner.start();
  let result = await fn();
  spinner.succeed(); // 结束loading
  return result;
}

const downloadCode = async (repo, projectName) => {
  const fullPath = mkdirp.sync(path.resolve(process.cwd(), projectName))
  try {
    let repoName
    if (repo === 'h5') {
      repoName = 'kokiy/umi-h5-template#main'
    } else if (repo === 'desktop') {
      repoName = 'kokiy/umi-web-template#main'
    }
    await downloadGitPromise(repoName, fullPath);
  } catch (error) {
    console.log('错误了吗？？？\n');
    console.log(error);
  }
  return fullPath;
}






module.exports = {
  mapActions,
  fnLoadingByOra,
  downloadCode
};

