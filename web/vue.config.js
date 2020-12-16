const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    API: JSON.stringify(process.env.API)
                }
            })
        ]
    }
}
