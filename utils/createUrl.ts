export default function createUrl(base: string, searchParams: Record<string, string>): URL {
	const url = new URL('http://api.weatherapi.com/v1/forecast.json');
	for (const key in searchParams) {
		url.searchParams.set(key, searchParams[key]);
	}
	return url;
}