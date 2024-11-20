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
		colors: {
			bg: {
				0: '#141E51',
				1: '#2D4EA4',
			},
		},
	},
	variants: [
		(matcher) => {
			if (!matcher.startsWith('nth-')) return matcher;
			let number = matcher.slice(4, matcher.indexOf(':'));
			if (number[0] == '[' && number[number.length - 1] == ']') number = number.slice(1, -1);

			return {
				matcher:  matcher.slice(matcher.indexOf(':') + 1),
				selector: (s) => `${s}:nth-child(${number})`,
			};
		},
	],
	rules: [
		// Use non-breaking-space as content. Useful for icons
		['c_', { content: '"\xA0"' }],
	],
	shortcuts: [
		/** grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr)); */
		[/^grid-(cols|rows)-fit-(\S+)$/, ([, type, value]) => {
			const numValue = Number(value);
			if (!isNaN(numValue)) value = `${numValue / 4}rem`;
			return `grid-${type}-[repeat(auto-fit,minmax(${value},1fr))]`;
		}],
	],
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
