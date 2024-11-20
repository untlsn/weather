<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useSearchQuery, { type Bbox, fetchSearchQuery } from '~/composables/useSearchQuery';
import WeatherDisplay from '~/components/WeatherDisplay.vue';
import { onClickOutside } from '@vueuse/core';
import wait from '~/utils/wait';

const inputValue = shallowRef('');
const searchQuery = useSearchQuery(inputValue);
const rectangleCords = shallowRef<Bbox>();

const open = shallowRef(false);
onClickOutside(useTemplateRef('search'), () => {
	open.value = false;
});

const applyCurrentLocation = () => {
	navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
		rectangleCords.value = {
			lat1: latitude,
			lat2: latitude,
			lon1: longitude,
			lon2: longitude,
		};
	});
};
const lazySelect = async () => {
	rectangleCords.value = (await fetchSearchQuery(inputValue.value)).results[0].bbox;
};
</script>

<template>
	<main class="">
		<form
			ref="search"
			class="w-fit absolute right-6 top-6"
			@submit.prevent="lazySelect"
		>
			<input
				v-model="inputValue"
				class="w-60 border text-white rounded px-4 h-10"
				@focus="open = true"
			>
			<button
				type="button"
				class="size-10 rounded-lg border text-white ml-2 mr-4"
				@click="applyCurrentLocation"
			>
				<i class="i-ph-map-pin-area scale-200">Current location</i>
			</button>
			<button
				type="submit"
				class="h-10 text-white border rounded-lg border px-4 hocus:(text-bg-0 bg-white) transition-colors"
			>
				Search
			</button>
			<div v-if="inputValue && open" class="relative">
				<div class="min-w-60 w-fit border rounded-lg absolute mt-2 bg-bg-1 px-4 py-2 text-white">
					<button
						v-for="place in searchQuery.data.value?.results"
						:key="place.place_id"
						type="button"
						class="block text-left w-full p-2 not-last:border-b hover:opacity-70"
						:value="place.place_id"
						@click="rectangleCords = place.bbox; open = false"
					>
						<b>{{ place.city }},</b> {{ place.country }}
					</button>
					<p v-if="!searchQuery.data.value?.results.length">
						No results
					</p>
				</div>
			</div>
		</form>
		<WeatherDisplay :rectangle-cords="rectangleCords" />
	</main>
	<VueQueryDevtools />
</template>

<style>
body {
	@apply bg-bg-0 min-h-screen overflow-x-hidden
}
</style>
