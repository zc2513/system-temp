module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        '@vue/app',
        [
            '@babel/preset-env', {
                modules: false
            }
        ]
    ],
    plugins: [
        [
            'component',
            {
                'libraryName': 'element-ui',
                'styleLibraryName': 'theme-chalk'
            }
        ]
    ],
    'env': {
        'development': { // 提高热更新的速度
            'plugins': ['dynamic-import-node']
        }
    }
}
