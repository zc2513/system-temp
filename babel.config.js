module.exports = {
  presets: [ 
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {//提高热更新的速度 
      'plugins': ['dynamic-import-node']
    }
  }
}
