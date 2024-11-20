<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useSearchQuery from '~/composables/useSearchQuery';
import WeatherDisplay from '~/components/WeatherDisplay.vue';


const inputValue = shallowRef('');
const searchQuery = useSearchQuery(inputValue);
</script>

<template>
	<main class="bg-bg-0 min-h-screen">
		<div>
			<input v-model="inputValue" type="text">
			<ul>
				<li v-for="place in searchQuery.data.value?.results" :key="place.place_id">
					{{ place.city }} {{ place.state }}
				</li>
			</ul>
		</div>
		<WeatherDisplay />
	</main>
	<VueQueryDevtools />
</template>
