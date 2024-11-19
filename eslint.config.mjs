// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';

export default withNuxt({
	plugins: { '@stylistic': stylistic },
	rules:   {
		'vue/max-attributes-per-line': ['error', {
			singleline: { max: 3 },
			multiline:  { max: 1 },
		}],
		'prefer-const':                                      1,
		'space-infix-ops':                                   1,
		'no-console':                                        [1, { allow: ['warn', 'error'] }],
		'prefer-destructuring':                              1,
		'@typescript-eslint/no-unused-vars':                 1,
		'@typescript-eslint/method-signature-style':         1,
		'@typescript-eslint/no-explicit-any':                0,
		'@typescript-eslint/no-non-null-assertion':          0,
		'@typescript-eslint/ban-ts-comment':                 0,
		'@typescript-eslint/explicit-module-boundary-types': 1,
		'@stylistic/semi':                                   [1, 'always'],
		'@stylistic/no-multiple-empty-lines':                [1, { max: 2, maxEOF: 0 }],
		'@stylistic/arrow-parens':                           [1, 'always'],
		'@stylistic/indent':                                 [1, 'tab', { SwitchCase: 1 }],
		'@stylistic/comma-dangle':                           [1, 'always-multiline'],
		'@stylistic/quote-props':                            [1, 'as-needed'],
		'@stylistic/object-curly-spacing':                   [1, 'always'],
		'@stylistic/object-curly-newline':                   [1, { multiline: true, consistent: true }],
		'@stylistic/no-trailing-spaces':                     1,
		'@stylistic/quotes':                                 [1, 'single'],
		'@stylistic/key-spacing':                            [1, { align: 'value' }],
		'@stylistic/space-before-blocks':                    1,
		'@stylistic/comma-spacing':                          1,
	},
});
