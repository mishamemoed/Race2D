const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '.' },
            ],
        }),
    ],
    mode: 'production',
    devtool: 'inline-source-map',
    entry: ['@babel/polyfill', './src/scripts.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'www'),
    },
    devServer: {
        contentBase: './www',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    }
};