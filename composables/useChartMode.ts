type Mode = 'snow' | 'rain' | 'temp' | 'min-temp' | 'max-temp' | 'wind' | 'humidity' | 'uv';
const modeToName: Record<Mode, string> = {
	snow:       'Chance of snow',
	rain:       'Chance of rain',
	'min-temp': 'Min temperature',
	'max-temp': 'Max temperature',
	temp:       'Average temperature',
	wind:       'Wind',
	humidity:   'Humidity',
	uv:         'UV',
};
const modeToKey = {
	snow:       'daily_chance_of_snow',
	rain:       'daily_chance_of_rain',
	'min-temp': 'mintemp_c',
	'max-temp': 'maxtemp_c',
	temp:       'avgtemp_c',
	wind:       'maxwind_kph',
	humidity:   'avghumidity',
	uv:         'uv',
} satisfies Record<Mode, keyof Day>;

type ValueOf<T> = T[keyof T];

type ChartMode = {
	current:       Mode,
	readonly name: string,
	readonly key:  ValueOf<typeof modeToKey>,
	format:        (value: unknown) => string
};

export default function useChartMode(): ChartMode {
	const currentMode = shallowRef<Mode>('temp');

	return {
		get current() {
			return currentMode.value;
		},
		set current(newValue) {
			currentMode.value = newValue;
		},
		get name() {
			return modeToName[currentMode.value];
		},
		get key()  {
			return modeToKey[currentMode.value];
		},
		format(value) {
			switch (currentMode.value) {
				case 'temp':
				case 'min-temp':
				case 'max-temp':
					return `${value} °C`;
				case 'humidity':
				case 'rain':
				case 'snow':
					return `${value}%`;
				case 'wind': return `${value} km/h`;
				default: return String(value);
			}
		},
	};
}