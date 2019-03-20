const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let entry = {}
let html = []
let files = fs.readdirSync(path.resolve(__dirname, "examples"))
files.forEach((file)=>{
  let ext = path.extname(file)
  let name = path.basename(file, ext)
  if(ext=='.jsx'){
    if(!fs.existsSync(path.resolve(__dirname, "examples")+`/${name}.html`)){
      console.log([path.resolve(__dirname, '/')+'index.html'])
      fs.copyFileSync('./index.html',path.resolve(__dirname, "examples")+`/${name}.html`)
    }
    entry[name]=`./examples/${file}`;
    html.push(
      new HtmlWebpackPlugin({
        chunks: [name],
        template:'index.html',
        filename: `${name}.html`
      })
    )
    // console.log([html,entry])
  }
  
})



// console.log([entry,html])
// return;
module.exports = {
  mode: "production",
  entry,
  // entry: {button: "./examples/button.jsx"},
  output:{
    path: path.resolve(__dirname, "dist"), 
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath:"",
    // libraryTarget: "umd",
    // libraryTarget: "umd2", // 通用模块定义
        // libraryTarget: "commonjs2", // exported with module.exports
  //       libraryTarget: "commonjs-module", // 使用 module.exports 导出
        // libraryTarget: "commonjs", // 作为 exports 的属性导出
        // libraryTarget: "amd", // 使用 AMD 定义方法来定义
  //       libraryTarget: "this", // 在 this 上设置属性
  //       libraryTarget: "var", // 变量定义于根作用域下
  //       libraryTarget: "assign", // 盲分配(blind assignment)
  //       libraryTarget: "window", // 在 window 对象上设置属性
  //       libraryTarget: "global", // property set to global object
  //       libraryTarget: "jsonp", // jsonp wrapper
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
              path.resolve(__dirname, "src"),
              path.resolve(__dirname, "examples")
            ],
            loader: "babel-loader",
            options: {
              presets: ["@babel/env","@babel/react"],
              plugins: ['transform-class-properties']
            },
            exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        include: [
              path.resolve(__dirname, "src"),
              path.resolve(__dirname, "examples")
            ],
            loader: ["eslint-loader"],
            exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ['style-loader','css-loader','less-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
     extensions: [".js", ".json", ".jsx", ".css"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: `],
            },
            onErrors: function(severity, errors){
              // console.log(errors)
              if (severity !== 'error') {
              return;
          }
          return errors
            // const error = errors[0];
            // notifier.notify({
            //   title: "Webpack error",
            //   message: severity + ': ' + error.name,
            //   subtitle: error.file || '',
            //   icon: ICON
            // });
            },
            clearConsole: true,
        }),
  //       new HtmlWebpackPlugin({
    //  template:'index.html',
    //  filename: 'index.html'
    // }),
        ...html
    
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    compress: true,
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
      noInfo: true,
    port: 9000,
    open: true,
    overlay: true
  },
  performance: {
    hints: false,
  },
  cache: true,
  stats: "errors-only"
  // stats: {
  //  builtAt: true,
  //  cached: true,
  //  colors: false,
  //  timings: true,
  //  version: true,
  //  warnings: true,
  //  errors: true,
  //  errorDetails: true,
  // }
}