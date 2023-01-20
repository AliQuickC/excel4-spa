/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCss =  require('postcss-preset-env');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

// в зависимости от режима сборки, добавляет/удаляет хэш к имени файла
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
console.log('IS PROD', isProd);
console.log('IS DEV', isDev);

const devServer = (isDev) => !isDev ? {} : {
	devServer: {
		open: true,
		hot: true,
		liveReload: true,
		port: 3000,
		static: ['./src', './public'],
	},
};

module.exports = {
	context: path.resolve(__dirname, 'src'), // контекст работы webpack
	mode: 'development', // режим разработки
	entry: './index.ts', // точка входа
	output: {
		filename: filename('js'), // js файл, куда будут собираться все скрипты
		path: path.resolve(__dirname, 'build') // путь по которому будут складываться собранные скрипты
	},

	devtool: isDev ? 'source-map' : false, // добавляет ".map" файлы, в режиме разработки

	resolve: {
		extensions: ['.tsx', '.ts', '.js'], // разрешение по умолчанию
		alias: { // алиасы для путей к папкам
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core')
		}
	},

	plugins: [
		new CleanWebpackPlugin(),  // чистит папку build, перед новой сборкой
		new HTMLWebpackPlugin({ // обработка HTML
			template: 'index.html', // шаблон для генерации html файла
			minify: { // минификация html файлов, если режим сборки 'production'
				removeComments: isProd, // удалить коментарии
				collapseWhitespace: isProd // удалить прбелы
			}
		}),
		new CopyPlugin({ // копирует необходимые файлы в build
			patterns: [
				{ from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'build') }
			]
		}),
		new MiniCssExtractPlugin({ // выносит css из js в отдельный файл
			filename: filename('css') // имя css файла, куда будут собираться все стили
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		// new ESLintPlugin({ extensions: 'ts' }),
	],

	module: {
		rules: [ // описываем лоадеры которые будут использоваться в проекте
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [PostCss],
							},
						},
					},
					'sass-loader'
				],
			},
			{
				test: /\.[tj]s$/,
				use: 'ts-loader',
				// use: ['ts-loader', 'eslint-loader'],
				exclude: /node_modules/,
			}
		]
	},

	...devServer(isDev)
};
