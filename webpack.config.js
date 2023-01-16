const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

// Port config
const port = process.env.PORT || 3000;

// Export config
module.exports = {

    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[fullhash].js',
        publicPath: '/',
    },
    context: path.resolve(__dirname),
    devServer: {
        port,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // Rules JS and JSX prev linting
            // {
            //     enforce: 'pre',
            //     test: /(\.js|\.jsx)$/,
            //     exclude: /node_modules/,
            //     use: [
            //         'source-map-loader',
            //     ],
            // },
            // Rules JS and JSX
            // Babel ES y JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                            ],
                    },
                },
            },
            // Rules CSS, SCSS and SASS
            {
                test: /(\.css|\.scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // MiniCssExtractPlugin.loader,
                ],
            },
            // Rules images
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
            template: './public/index.html',
            },
        ),
        new MiniCssExtractPlugin(
            {
            filename: './css/styles.css',
            },
        ),
        new SourceMapDevToolPlugin(
            {
            filename: '[file].map',
            },
        ),
        ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [
            'node_modules',
        ],
        alias: {
            'react-redux': path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min'),
        },
    },
    performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
    },
};
