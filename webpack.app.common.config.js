// const InjectPlugin = require("webpack-inject-plugin")
const path = require("path")
// const webpack = require("webpack")



module.exports = (env) => {
    return {
        entry: './app/app.ts',
        output: {
            filename: 'dist/TGM.js',
            chunkFilename: 'dist/[name].js',
            path: path.resolve(path.dirname(''), "public"),
            publicPath: "/",
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                ghostApiKey: env.ghostApiKey
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /([a-zA-Z0-9\s_\\.\-\(\):])+\.static\.([a-zA-Z0-9])+$/,
                    use: 'raw-loader',
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

                    test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1000000000,
                                encoding: "binary"
                            },
                        }
                    ]
                },
                {
                    test: /\.pug$/,
                    loader: ['raw-loader', 'pug-html-loader']
                }
            ]
        }
    }
};
