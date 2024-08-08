const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const componentsDir = path.resolve(__dirname, 'components'); 

const entries = {}; 

glob.sync(`${componentsDir}/**/*.{js,jsx}`).forEach((file) => {
    const relativePath = path.relative(__dirname, file).replace(/\\/g, '/');
    const componentName = path.basename(file, path.extname(file));
    entries[componentName] = `./${relativePath}`;
    console.log(`Processing file: ${file}, Component Name: ${componentName}, Relative Path: ${relativePath}`);
});

console.log('Webpack Entries:', entries);


module.exports = {
    mode: 'development',
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../../wwwroot/js/compiledreact/'),
        filename: '[name]Compiled.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};