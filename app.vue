<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import useSearchQuery from '~/composables/useSearchQuery';


const inputValue = shallowRef('');
const searchQuery = useSearchQuery(inputValue);
const weatherQuery = useWeatherQuery({ lon1: 20.6484062, lat1: 49.5549437, lon2: 20.7648749, lat2: 49.6655553 });

</script>

<template>
  <main>
		<div>
			<input v-model="inputValue" type="text">
			<ul>
				<li v-for="place in searchQuery.data.value?.results" :key="place.place_id">
					{{ place.city }} {{ place.state }}
				</li>
			</ul>
		</div>
	</main>
	<VueQueryDevtools />
</template>
