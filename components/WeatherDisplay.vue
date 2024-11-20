<script setup lang="ts">
import WeatherDisplayGridBlock from '~/components/WeatherDisplayGridBlock.vue';

const weatherQuery = useWeatherQuery({  });
const location = computed(() => weatherQuery.data.value?.location);
const current = computed(() => weatherQuery.data.value?.current);

</script>

<template>
	<article class="text-white">
		<header class="m-12">
			<h3 class="text-6">{{ location?.name }}</h3>
			<h2 class="text-24">{{ current?.temp_c }}°C</h2>
			<p class="text-6">{{ current?.condition.text }}</p>
			<img :src="`http:${current?.condition.icon}`" alt="">
		</header>
		<div class="grid-(~ cols-fit-100) gap-4 m-4">
			<WeatherDisplayGridBlock name="Wind" header-class="before:i-ph-wind">
				<p
					:style="`--degree: ${current?.wind_degree}deg`"
					class="before:(c_ i-ph-arrow-up-bold rotate-[--degree] scale-150 mr-2) font-semibold"
				>
					{{ current?.wind_kph }} km/h
				</p>
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="Pressure" header-class="before:i-ph-arrows-in-simple">
				{{ current?.pressure_mb }} mb
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="Humidity" header-class="before:i-ph-drop">
				{{ current?.humidity }}%
			</WeatherDisplayGridBlock>
			<WeatherDisplayGridBlock name="UV" header-class="before:i-ph-sun">
				{{ current?.uv }}
			</WeatherDisplayGridBlock>
		</div>
	</article>
</template>

<style scoped>

</style>