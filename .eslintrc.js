module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'prettier'],
	plugins: ['import'],
	env: {
		node: true,
		browser: true
	},
	rules: {
		'class-methods-use-this': ['off'],
		'comma-dangle': ['error', 'never'],
		'indent': ['error', 'tab'],
		'no-console': ['warn', { allow: ["error", "warn"] }],
		'no-extra-semi': ['error'],
		'no-loop-func': ['off'],
		'no-param-reassign': ['error', { props: false }],
		'no-plusplus': ['off'],
		'no-restricted-syntax': ['off'],
		'no-underscore-dangle': ['off'],
		'semi': ['error', 'always']
	}
};
