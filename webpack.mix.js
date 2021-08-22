/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const mix = require('laravel-mix');
const path = require('path');
require('dotenv').config();

let webpack = require('webpack');

let dotenvplugin = new webpack.DefinePlugin({
    'process.env': {
        MIX_OPENWEATHERMAP_URL: JSON.stringify(process.env.MIX_OPENWEATHERMAP_URL || ''),
        MIX_OPENWEATHERMAP_KEY: JSON.stringify(process.env.MIX_OPENWEATHERMAP_KEY || ''),
        MIX_OPENGEOCODING_URL: JSON.stringify(process.env.MIX_OPENGEOCODING_URL || ''),
        MIX_OPENGEOCODING_KEY: JSON.stringify(process.env.MIX_OPENGEOCODING_KEY || '')
    }
})

mix.js('resources/js/app.js', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css')
    .copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts')
    .options({
        postCss: [
            require('postcss-import'),
            require('tailwindcss'),
            require('autoprefixer'),
    ]})
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve('resources/js'),
            }
        },
        plugins: [
            dotenvplugin
        ]
    });

if (mix.inProduction()) {
    mix.version();
}
