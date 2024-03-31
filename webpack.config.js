const config = {
	mode: 'development',
	entry: {
		main: './src/js/main.js',
		index: './src/js/index.js',
	},
	output: {
		filename: '[name].min.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		],
	},
	externalsType: 'script',
	externals: {
		ymaps3: ['https://api-maps.yandex.ru/v3/?apikey=cc838777-989c-4721-a5f1-daa7532b3925&lang=ru_RU', 'ymaps3']
	},
	devtool: 'cheap-source-map'
}

export default config