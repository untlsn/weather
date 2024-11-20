import type { WritableComputedRef } from 'vue';

export default function useSearchParam<T>(key: string): WritableComputedRef<T> {
	const route = useRoute();
	const router = useRouter();
	return computed({
		get() {
			const value = route.query[key];
			return value ? JSON.parse(String(route.query[key])) : undefined;
		},
		set(value) {
			void router.replace({ query: { [key]: value } });
		},
	});
}