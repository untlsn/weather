<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import WeatherDisplay from '~/components/WeatherDisplay.vue';
import SearchField from '~/components/SearchField.vue';

const rectangleCords = shallowRef<Bbox>();
</script>

<template>
	<main class="">
		<SearchField @change="rectangleCords = $event" />
		<WeatherDisplay :rectangle-cords="rectangleCords" />
	</main>
	<VueQueryDevtools />
</template>

<style>
body {
	@apply bg-bg-0 min-h-screen overflow-x-hidden text-white
}
</style>
