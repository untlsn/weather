<script setup lang="ts">
import WeatherDisplayGridBlock from '~/components/WeatherDisplayGridBlock.vue';
import ConditionImage from '~/components/ConditionImage.vue';
import * as date from 'date-fns';
import type { Bbox } from '~/composables/useSearchQuery';
import ChartComposer from '~/components/ChartComposer.vue';

const props = defineProps<{
	rectangleCords?: Bbox
}>();

const weatherQuery = useWeatherQuery(() => props.rectangleCords);
const location = computed(() => weatherQuery.data.value?.location);
const current = computed(() => weatherQuery.data.value?.current);
const forecastday = computed(() => weatherQuery.data.value?.forecast?.forecastday);

</script>

<template>
	<article class="text-white">
		<header class="m-12 sm:grid-(~ cols-2) w-fit gap-x-24">
			<h3 class="col-start-1 text-6">{{ location?.name }}</h3>
			<h2 class="col-start-1 text-24">{{ current?.temp_c || '-' }}°C</h2>
			<p class="col-start-1 text-6">{{ current?.condition.text }}</p>
			<ConditionImage class="col-start-2 row-start-1 row-end-3 h-full min-h-32 mx-auto" :condition="current?.condition" />
		</header>
		<ul class="grid-(~ cols-fit-40) gap-4 m-4">
			<WeatherDisplayGridBlock name="Wind" header-class="before:i-ph-wind">
				<p
					:style="`--degree: ${current?.wind_degree}deg`"
					class="before:(c_ i-ph-arrow-up-bold rotate-[--degree] scale-150 mr-2) font-semibold"
				>
					{{ current?.wind_kph || '-' }} km/h
				</p>
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="Pressure" header-class="before:i-ph-arrows-in-simple">
				{{ current?.pressure_mb || '-' }} mb
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="Humidity" header-class="before:i-ph-drop">
				{{ current?.humidity || '-' }}%
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="UV" header-class="before:i-ph-sun">
				{{ current?.uv || '-' }}
			</WeatherDisplayGridBlock>
		</ul>
		<ul class="grid grid-cols-2 md:grid-cols-12 2xl:grid-cols-7 gap-4 m-4">
			<li
				v-for="day in forecastday"
				:key="day.date"
				class="bg-bg-1 rounded-lg p-4 flex-(~ col) justify-between gap-2 text-center dynamic-span max-md:nth-7:(col-span-2 w-1/2 mx-auto)"
			>
				<p class="font-semibold">
					{{ date.format(day.date, 'EEEE') }}
					<i v-if="date.isToday(day.date)" class="font-400">
						(today)
					</i>
				</p>
				<div class="flex justify-evenly items-center">
					<p class="text-8">{{ day.day.avgtemp_c }}°C</p>
					<ConditionImage :condition="day.day.condition" />
				</div>
				<p>{{ current?.condition.text }}</p>
			</li>
		</ul>
	</article>
	<ChartComposer v-if="forecastday" :days="forecastday" />
</template>

<style scoped>
@media (min-width: 768px) and (max-width: 1535px) {
	.dynamic-span {
		grid-column: span 4/span 4;
	}
	.dynamic-span:nth-child(-n+4) {
		grid-column: span 3/span 3;
	}
}
</style>