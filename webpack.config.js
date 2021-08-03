const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3000,
        watchContentBase: true,
        historyApiFallback: true  // need to always serve index.html for any path when using react router
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/react'],
                }
            },
            {
                test: /\.(sass|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.(jpg|png|svg|jpeg)$/,
                type: 'asset/inline'
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}
