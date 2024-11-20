<script setup lang="ts">
defineProps<{
	name:         string,
	headerClass?: string,
}>();
</script>

<template>
	<section class="text-center bg-bg-1 p-4 rounded-lg font-semibold">
		<header class="text-white/60 before:(c_ mr-2 scale-125) mb-4" :class="headerClass">
			{{ name }}
		</header>
		<slot />
	</section>
</template>

<style scoped>

</style>