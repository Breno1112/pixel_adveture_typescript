import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|jpeg|gif|svg|mp3|wav)$/, type: 'asset/resource' }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pixel Adventure'
    })
  ]
};

