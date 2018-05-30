const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",

  context: path.resolve(__dirname, "assets/javascripts"),

  entry: "./application.js",

  output: {
    path: path.resolve(__dirname, "../../public/assets"),
    publicPath: "/assets/",
    filename: "application.js",
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },

  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },

  plugins: [
    new VueLoaderPlugin()
  ],

  devServer: {
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    stats: "errors-only"
  }
};
