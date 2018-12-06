'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const manifestFile = require('./manifest.json');

module.exports = (config) => {

    const {
        output,
        root,
        sources: { compile: compile, manifest } } = config.paths;
    const ROOT = path.join(__dirname, root);
    
    const webpackConfig = {
        entry: {
            vendor: [
                'babel-polyfill',
                'raf/polyfill',
                'whatwg-fetch',
                'react',
                'react-dom',
                'react-redux',
                'redux',
                'redux-thunk'
            ],
            app: [
                path.join([ROOT, compile.src, compile.jsEntry].join(''))
            ]
        },
        output: {
            path: path.join(ROOT, output.dest, output.dist),
            pathinfo: false,
            filename: '[name].js',
            chunkFilename: 'vendor',
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                // the chunk name of the commons chunk. An existing chunk can be selected 
                // by passing a name of an existing chunk. If an array of strings is passed this is equal 
                //to invoking the plugin multiple times for each chunk name.
                name: 'vendor',
                // the filename template for the commons chunk. Can contain the same placeholders as `output.filename`.
                // If omitted the original filename is not modified (usually `output.filename` or `output.chunkFilename`).
                // This option is not permitted if you're using `options.async` as well, see below for more details.
                filename: '[name].js',
            }),
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin({
                filename: '[name].css',
                disable: config.isUsedHotReloading
            }),
            new HtmlWebpackPlugin({
                //if true then append a unique webpack compilation hash to all included scripts and CSS files. 
                //This is useful for cache busting
                //hash: true, // Terminal creshes when hashed
                //pass options as object to minify the output
                //see options: https://github.com/kangax/html-minifier#options-quick-reference
                minify: {
                    removeComments: true,
                    useShortDoctype: true,
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    sortAttributes: true,
                    sortClassName: true,
                },
		        //allows you to skip some chunks (e.g don't add the unit-test chunk)
		        //excludeChunks: ['vendor'],
                //webpack require path to the template.
                //see: https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
                template: path.join([ROOT, compile.src, compile.htmlEntry].join('')),
                //allows you to add only some chunks (e.g only the unit-test chunk)
                chunks: ['vendor', 'app'],
                //allows to control how chunks should be sorted 
                //before they are included to the HTML
                chunksSortMode: 'dependency',
                xhtml: true,
                meta: {
                    viewport: 'width=device-width, initial-scale=1'
                },
                version: `UI ver. ${JSON.parse(fs.readFileSync(manifest)).version}`
            }),
            new StyleLintPlugin({
                //specify the config file location to be used by stylelint.
                configFile: '.stylelintrc',
                //a string indicating the root of your SCSS files
                context: compile.src,
                //specify the glob pattern for finding files
                files: ['**/*.scss'],
            }),
            new ForkTsCheckerWebpackPlugin({
                async: true,
                watch: path.join([ROOT, compile.src].join('')),
                tsconfig: './tsconfig.json',
                tslint: true
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: {
                                // disable type checker - we will use it in fork plugin
                                transpileOnly: true,
                                logLevel: 'info',
                            },
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        //loader(e.g 'style-loader') that should be used when the CSS is not extracted 
                        //(i.e. in an additional chunk when allChunks: false)
                        fallback: 'style-loader',
                        //loader(s) that should be used for converting the resource 
                        //to a CSS exporting module (required)
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [autoprefixer({
                                        browsers: [
                                            '> 1%',
                                            'last 2 versions',
                                            'chrome 23'
                                        ]
                                    })]
                                }
                            },
                            'sass-loader'
                        ]
                    })
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    //put it in /fonts directory and specify the hash method 
                    //to use for hashing the file content
                    loader: 'file-loader?name=./fonts/[hash].[ext]',
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000&name=./assets/imgs/[hash].[ext]'
                },
                {
                    test: /\.(webm)$/,
                    use: 'file-loader?name=./assets/video/[hash].[ext]'
                }
            ]
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(path.join(ROOT, compile.src))
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.webm'],
            alias: {
                "@components": path.resolve(__dirname, './app/components/'),
                "@core": path.resolve(__dirname, './app/core/'),
                "@screens": path.resolve(__dirname, './app/screens/'),
                "@root": path.resolve(__dirname, './app/'),
                "@store": path.resolve(__dirname, './app/store/')
            }
        }
    };

    compile.htmlEntryAfter.length && webpackConfig.plugins.push(new FileManagerPlugin({
        onEnd: {
            move: [
                {
                    source: path.join(ROOT, output.dest, output.dist, compile.htmlEntry),
                    destination: path.join(ROOT, output.dest, output.dist, compile.htmlEntryAfter)
                }
            ]
        }
    }));

    return webpackConfig;
};