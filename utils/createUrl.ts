export default function createUrl(base: string, searchParams: Record<string, string>): URL {
	const url = new URL(base);
	for (const key in searchParams) {
		url.searchParams.set(key, searchParams[key]);
	}
	return url;
}