const path = require('path')

const conf = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'main.js',
        publicPath: '/js'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    }
}


module.exports = (env, options) => {
    options.mode == 'production' 
        ? conf.devtool = ''
        : conf.devtool = 'cheap-module-eval-source-map'

    return conf
};