<script setup lang="ts">
defineProps<{
	name:         string,
	headerClass?: string,
}>();
</script>

<template>
	<li class="text-center bg-bg-1 p-4 rounded-lg font-semibold">
		<p class="text-white/60 before:(c_ mr-2 scale-125) mb-4" :class="headerClass">
			{{ name }}
		</p>
		<slot />
	</li>
</template>

<style scoped>

</style>