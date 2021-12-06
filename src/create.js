var inquirer = require('inquirer')
const { fnLoadingByOra, downloadCode } = require('./utils/common');


module.exports = async (projectName) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: '请选择一个你要创建的项目类型',
      choices: ['h5', 'desktop']
    }
  ]).then(async (answers) => {
    const asyncLoadCode = async () => {
      await downloadCode(answers.repo, projectName)
    }
    const target = await fnLoadingByOra(asyncLoadCode, '下载项目中');
    console.log('下载完成')
  })
};



