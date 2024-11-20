<script setup lang="ts">
import type { ComposeOption } from 'echarts/core';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import type { GridComponentOption } from 'echarts/components';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as date from 'date-fns';
import ChartComposerRadioOption from '~/components/ChartComposerRadioOption.vue';

use([GridComponent, LineChart, CanvasRenderer]);

provide(THEME_KEY, 'dark');

const props = defineProps<{
	days: Forecastday[],
}>();
type ECOption = ComposeOption<GridComponentOption>;
type Mode = 'temp' | 'wind' | 'humidity' | 'uv';
const currentMode = shallowRef<Mode>('temp');

const modeToKey = {
	temp:     'avgtemp_c',
	wind:     'maxwind_kph',
	humidity: 'avghumidity',
	uv:       'uv',
} satisfies Record<Mode, keyof Day>;

const options = computed((): ECOption => ({
	backgroundColor: '#2D4EA419',
	xAxis:           {
		type: 'category',
		data: props.days.map((day) => date.format(day.date, 'EEE')),
	},
	yAxis: {
		type:      'value',
		axisLabel: {
			formatter(value) {
				switch (currentMode.value) {
					case 'temp': return `${value} °C`;
					case 'wind': return `${value} km/h`;
					case 'humidity': return `${value}%`;
					default: return String(value);
				}
			},
		},
	},
	series: [
		{
			data:   props.days.map((day) => day.day[modeToKey[currentMode.value]]),
			type:   'line',
			smooth: true,
		},
	],
}));
</script>

<template>
	<article class="m-4">
		<h2 class="text-8 font-bold mb-4">Change over time</h2>
		<RadioGroupRoot v-model="currentMode" class="flex gap-4 justify-center">
			<ChartComposerRadioOption value="temp" icon="i-ph-thermometer-simple" />
			<ChartComposerRadioOption value="wind" icon="i-ph-wind" />
			<ChartComposerRadioOption value="humidity" icon="i-ph-drop" />
			<ChartComposerRadioOption value="uv" icon="i-ph-sun" />
		</RadioGroupRoot>
		<vChart class="w-full h-100 rounded-lg shadow-lg" :option="options" />
	</article>
</template>

<style scoped>

</style>