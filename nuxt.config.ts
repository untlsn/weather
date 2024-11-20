// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools:          { enabled: true },
	modules:           ['@unocss/nuxt', '@nuxt/eslint', 'radix-vue/nuxt', 'nuxt-echarts'],
	css:               ['~/assets/style/reset.css'],
	ssr:               false,
});