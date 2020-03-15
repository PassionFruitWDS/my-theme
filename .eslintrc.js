module.exports = {
	root: true,
	extends: [
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	globals: {
		wp: true,
		browser: true
	},
	env: {
		node: true,
		es6: true,
		amd: true,
		browser: true,
		jquery: true
	},
	parserOptions: {
		ecmaFeatures: {
			globalReturn: true,
			generators: false,
			objectLiteralDuplicateProperties: false
		},
		ecmaVersion: 2017,
		sourceType: 'module',
		project: './tsconfig.json'
	},
	plugins: ['import'],
	settings: {
		'import/core-modules': [],
		'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$']
	},
	rules: {
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 'off',
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'ignore'
			}
		],
		'max-len': [
			'error',
			{
				'code': 80,
				'ignoreComments': true,
				'ignoreUrls': true,
				'ignoreStrings': true,
				'ignoreTemplateLiterals': true,
				'ignoreRegExpLiterals': true
			}
		],
		'no-tabs': ['error', {'allowIndentationTabs': true}],
		'no-underscore-dangle': ['error', {'allowAfterThis': true}],
		'padded-blocks': ['error', {'classes': 'always'}],
		'symbol-description': 'off'
	}
};
