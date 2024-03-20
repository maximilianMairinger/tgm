// const InjectPlugin = require("webpack-inject-plugin")
const path = require("path")
const webpack = require("webpack")
const Dotenv = require('dotenv-webpack');



module.exports = (env) => {
    return {
        entry: './app/app.ts',
        output: {
            filename: 'dist/TGM.js',
            chunkFilename: 'dist/[name].js',
            path: path.resolve(path.dirname(''), "public"),
            publicPath: "/",
        },
        // plugins: [
        //     new Dotenv({
        //         systemvars: true
        //     })
        // ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /([a-zA-Z0-9\s_\\.\-\(\):])+\.static\.([a-zA-Z0-9])+$/,
                    type: 'asset/source',
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig.app.json"
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                },
                {
                    test: /\.pug$/,
                    use: ['raw-loader', 'pug-html-loader']
                },
                {

                    test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                    type: "asset/inline"
                },
            ]
        }
    }
};
