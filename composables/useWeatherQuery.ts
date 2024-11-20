import { keepPreviousData, useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import type { Bbox } from '~/composables/useSearchQuery';
import createUrl from '~/utils/createUrl';

export type WeatherQueryResponse = {
	location: Location
	current:  Current
	forecast: Forecast
};

export type Location = {
	name:            string
	region:          string
	country:         string
	lat:             number
	lon:             number
	tz_id:           string
	localtime_epoch: number
	localtime:       string
};

export type Current = {
	last_updated_epoch: number
	last_updated:       string
	temp_c:             number
	temp_f:             number
	is_day:             number
	condition:          Condition
	wind_mph:           number
	wind_kph:           number
	wind_degree:        number
	wind_dir:           string
	pressure_mb:        number
	pressure_in:        number
	precip_mm:          number
	precip_in:          number
	humidity:           number
	cloud:              number
	feelslike_c:        number
	feelslike_f:        number
	windchill_c:        number
	windchill_f:        number
	heatindex_c:        number
	heatindex_f:        number
	dewpoint_c:         number
	dewpoint_f:         number
	vis_km:             number
	vis_miles:          number
	uv:                 number
	gust_mph:           number
	gust_kph:           number
};

export type Condition = {
	text: string
	icon: string
	code: number
};

export type Forecast = {
	forecastday: Forecastday[]
};

export type Forecastday = {
	date:       string
	date_epoch: number
	day:        Day
	astro:      Astro
	hour:       Hour[]
};

export type Day = {
	maxtemp_c:            any
	maxtemp_f:            number
	mintemp_c:            number
	mintemp_f:            number
	avgtemp_c:            number
	avgtemp_f:            number
	maxwind_mph:          number
	maxwind_kph:          number
	totalprecip_mm:       number
	totalprecip_in:       number
	totalsnow_cm:         number
	avgvis_km:            number
	avgvis_miles:         number
	avghumidity:          number
	daily_will_it_rain:   number
	daily_chance_of_rain: number
	daily_will_it_snow:   number
	daily_chance_of_snow: number
	condition:            Condition2
	uv:                   number
};

export type Condition2 = {
	text: string
	icon: string
	code: number
};

export type Astro = {
	sunrise:           string
	sunset:            string
	moonrise:          string
	moonset:           string
	moon_phase:        string
	moon_illumination: number
	is_moon_up:        number
	is_sun_up:         number
};

export type Hour = {
	time_epoch:     number
	time:           string
	temp_c:         any
	temp_f:         number
	is_day:         number
	condition:      Condition3
	wind_mph:       number
	wind_kph:       number
	wind_degree:    number
	wind_dir:       string
	pressure_mb:    number
	pressure_in:    number
	precip_mm:      number
	precip_in:      number
	snow_cm:        number
	humidity:       number
	cloud:          number
	feelslike_c:    number
	feelslike_f:    number
	windchill_c:    number
	windchill_f:    number
	heatindex_c:    any
	heatindex_f:    number
	dewpoint_c:     number
	dewpoint_f:     number
	will_it_rain:   number
	chance_of_rain: number
	will_it_snow:   number
	chance_of_snow: number
	vis_km:         number
	vis_miles:      number
	gust_mph:       number
	gust_kph:       number
	uv:             number
};

export type Condition3 = {
	text: string
	icon: string
	code: number
};


export default function useWeatherQuery(rectangleCords?: MaybeRefOrGetter<Bbox | undefined>): UseQueryReturnType<WeatherQueryResponse, Error> {
	const url = createUrl('http://api.weatherapi.com/v1/forecast.json', {
		key:  import.meta.env.VITE_WEATHER_KEY,
		aqi:  'no',
		days: '7',
	});

	return useQuery({
		queryKey: computed(() => ['weatherapi', 'forecast', toValue(rectangleCords)!] as const),
		async queryFn({ queryKey: [,, { lon1, lat1, lat2, lon2 }] }): Promise<WeatherQueryResponse> {
			const lon = (lon1 + lon2) / 2;
			const lat = (lat1 + lat2) / 2;

			url.searchParams.set('q', `${lat},${lon}`);
			return (await (fetch(url))).json();
		},
		enabled:         () => !!toValue(rectangleCords),
		placeholderData: keepPreviousData,
	});
}