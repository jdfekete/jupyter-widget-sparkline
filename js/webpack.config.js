var path = require('path');
var version = require('./package.json').version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']},
    {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
];


module.exports = [
    {// Notebook extension
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'jupyter_widget_sparkline', 'static'),
            libraryTarget: 'amd'
        },
        mode: 'development'
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './lib/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'jupyter_widget_sparkline', 'static'),
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        mode: 'development',
        externals: ['@jupyter-widgets/base']
    },
    {// Embeddable jupyter-widget-sparkline bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './lib/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/progressivis-nb-widgets@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        mode: 'development',
        externals: ['@jupyter-widgets/base']
    }
];
