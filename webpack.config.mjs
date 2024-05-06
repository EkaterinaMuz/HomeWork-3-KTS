import path from 'path';
import { fileURLToPath } from 'url';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  const cssLoaderWithModule = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s?[ac]ss$/i,
    use: [!isProd ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoaderWithModule, 'sass-loader'],
  };
  return scssLoader;
};

export default {
  entry: path.resolve(srcPath, 'main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    libraryExport: 'default',
    publicPath: '/',
  },
  target: !isProd ? 'web' : 'browserslist',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      getSettingsForStyles(),
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
      }),
  ],
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@': srcPath,
      '@pages': path.join(srcPath, 'pages'),
      '@features': path.join(srcPath, 'features'),
      '@widgets': path.join(srcPath, 'widgets'),
      '@shared': path.join(srcPath, 'shared'),
      '@entities': path.join(srcPath, 'entities'),
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, 'src'),
  },
};
