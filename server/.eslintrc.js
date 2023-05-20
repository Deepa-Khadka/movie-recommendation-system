module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'standard'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: ['react'],
	rules: {
		'no-trailing-spaces': 'warn',
	},
};
