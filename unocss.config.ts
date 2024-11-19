import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	presetWind,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';


export default defineConfig({
	theme: {
		zIndex: {
			// Default highest z-index
			top: 999,
		},
		colors: {},
	},
	rules: [
		// Use non-breaking-space as content. Useful for icons
		['c_', { content: '"\xA0"' }],
	],
	shortcuts: [],
	presets: [
		presetWind(),
		presetUno(),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: 'Manrope:400,500',
			},
		}),
		presetIcons({
			extraProperties: {
				display:       'inline-block',
				height:        'auto',
				'min-height':  '1em',
				'white-space': 'nowrap',
			},
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass(),
	],
});
