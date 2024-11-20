<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useSearchQuery, { type Bbox } from '~/composables/useSearchQuery';
import WeatherDisplay from '~/components/WeatherDisplay.vue';
import { onClickOutside } from '@vueuse/core';

const inputValue = shallowRef('');
const searchQuery = useSearchQuery(inputValue);
const rectangleCords = shallowRef<Bbox>();

const open = shallowRef(false);
onClickOutside(useTemplateRef('search'), () => {
	open.value = false;
});
</script>

<template>
	<main class="bg-bg-0 min-h-screen pb-8">
		<div ref="search" class="p-6">
			<input
				v-model="inputValue"
				class="w-60 border text-white block rounded px-4 py-2"
				@focus="open = true"
			>
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
		</div>
		<WeatherDisplay :rectangle-cords="rectangleCords" />
	</main>
	<VueQueryDevtools />
</template>
