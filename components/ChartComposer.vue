<script setup lang="ts">
import type { ComposeOption } from 'echarts/core';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import type { GridComponentOption } from 'echarts/components';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as date from 'date-fns';
import ChartComposerRadioOption from '~/components/ChartComposerRadioOption.vue';
import useChartMode from '~/composables/useChartMode';

const props = defineProps<{
	days: Forecastday[],
}>();

use([GridComponent, LineChart, CanvasRenderer]);
provide(THEME_KEY, 'dark');
type ECOption = ComposeOption<GridComponentOption>;

const mode = useChartMode();

const options = computed((): ECOption => ({
	backgroundColor: '#2D4EA419',
	xAxis:           {
		type: 'category',
		data: props.days.map((day) => date.format(day.date, 'EEE')),
	},
	yAxis: {
		type:      'value',
		axisLabel: { formatter: mode.format },
	},
	series: [
		{
			data:   props.days.map((day) => day.day[mode.key]),
			type:   'line',
			smooth: true,
		},
	],
}));
</script>

<template>
	<article class="m-4">
		<h2 class="text-8 mb-4">Change over time: <b>{{ mode.name }}</b></h2>
		<RadioGroupRoot v-model="mode.current" class="flex gap-4 justify-center">
			<ChartComposerRadioOption value="min-temp" icon="i-ph-snowflake" />
			<ChartComposerRadioOption value="max-temp" icon="i-ph-flame" />
			<ChartComposerRadioOption value="temp" icon="i-ph-thermometer-simple" />
			<Separator />
			<ChartComposerRadioOption value="humidity" icon="i-ph-drop" />
			<ChartComposerRadioOption value="rain" icon="i-ph-cloud-rain" />
			<ChartComposerRadioOption value="snow" icon="i-ph-cloud-snow" />
			<Separator />
			<ChartComposerRadioOption value="wind" icon="i-ph-wind" />
			<ChartComposerRadioOption value="uv" icon="i-ph-sun" />
		</RadioGroupRoot>
		<vChart class="w-full h-100 rounded-lg shadow-lg" :option="options" />
	</article>
</template>

<style scoped>

</style>