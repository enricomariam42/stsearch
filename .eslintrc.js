module.exports = {
	extends: ['hectorm'],
	env: { browser: true },
	rules: {
		'class-methods-use-this': ['off'],
		'max-len': ['error', { code: 150, ignoreStrings: true }],
		'no-param-reassign': ['off'],
	},
};
