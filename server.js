const express = require('express');
const path = require('path');

const app = new express();

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV !== 'production'){
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    //we require all three dependencies to make middleware work
    app.use(webpackMiddleware(webpack(webpackConfig)));
}else {
    app.use(express.static('dist'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    })
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));