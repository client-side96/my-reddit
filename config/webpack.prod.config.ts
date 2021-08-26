import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import commonConfig from './webpack.common';

const config: Configuration = {
    ...commonConfig,
    mode: 'production',
    entry: path.join(__dirname, '..', 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    plugins: [...(commonConfig.plugins as any), new CleanWebpackPlugin()],
};

export default config;
