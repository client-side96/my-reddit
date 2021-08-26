import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import commonConfig from './webpack.common';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    ...commonConfig,
    mode: 'development',
    entry: path.join(__dirname, '..', 'src', 'index.tsx'),
    output: {
        publicPath: '/',
        path: path.join(__dirname, '..', 'build'),
        filename: 'my-reddit-bundle.js',
    },
    plugins: [...(commonConfig.plugins as any), new HotModuleReplacementPlugin()],
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 4000,
    },
};

export default config;
