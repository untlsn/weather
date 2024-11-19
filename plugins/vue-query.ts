import { defineNuxtPlugin } from '#app';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { staleTime: 5 * 60 * 1000 }, // Adjust as necessary
		},
	});

	nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });
});