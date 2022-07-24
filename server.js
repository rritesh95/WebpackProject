const express = require('express');

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
//we require all three dependencies to make middleware work

const app = new express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(3050, () => console.log('Listening'));