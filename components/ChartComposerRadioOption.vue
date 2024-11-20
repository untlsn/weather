<script setup lang="ts">
defineProps<{
	value: string,
	icon:  string,
}>();
</script>

<template>
	<RadioGroupItem :value="value" class="border bg-bg-1 p-2 rounded-lg data-[state=unchecked]:opacity-50 transition-opacity">
		<i class="size-8" :class="icon">{{ value }}</i>
	</RadioGroupItem>
</template>

<style scoped>

</style>