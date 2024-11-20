import { refDebounced } from '@vueuse/core';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import { useQuery } from '@tanstack/vue-query';

export type SearchQueryResponse =  {
	results: Result[]
	query:   Query
};

export type Result =  {
	country:         string
	country_code:    string
	state:           string
	city:            string
	datasource:      Datasource
	state_code:      string
	lon:             number
	lat:             number
	population:      number
	result_type:     string
	formatted:       string
	address_line1:   string
	address_line2:   string
	category:        string
	timezone:        Timezone
	plus_code:       string
	plus_code_short: string
	rank:            Rank
	place_id:        string
	bbox:            Bbox
	county?:         string
	municipality?:   string
	postcode?:       string
};

export type Datasource =  {
	sourcename:  string
	attribution: string
	license:     string
	url:         string
};

export type Timezone =  {
	name:               string
	offset_STD:         string
	offset_STD_seconds: number
	offset_DST:         string
	offset_DST_seconds: number
	abbreviation_STD:   string
	abbreviation_DST:   string
};

export type Rank =  {
	confidence:            number
	confidence_city_level: number
	match_type:            string
};

export type Bbox =  {
	lon1: number
	lat1: number
	lon2: number
	lat2: number
};

export type Query =  {
	text:   string
	parsed: Parsed
};

export type Parsed =  {
	city:          string
	expected_type: string
};


export default function useSearchQuery(input: Ref<string>): UseQueryReturnType<SearchQueryResponse, Error> {
	const inputValueDebounced = refDebounced(input, 300);

	return useQuery({
		queryKey: ['geoapify', 'autocomplete', inputValueDebounced],
		async queryFn({ queryKey: [, , text] }) {
			return fetchSearchQuery(text);
		},
		enabled: () => !!inputValueDebounced.value,
	});
}

export async function fetchSearchQuery(text: string): Promise<SearchQueryResponse> {
	const url = createUrl('https://api.geoapify.com/v1/geocode/autocomplete', {
		apiKey: import.meta.env.VITE_GEOAPI_KEY,
		format: 'json',
		text,
	});
	return (await (fetch(url))).json();
}