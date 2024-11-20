<script setup lang="ts">
import type { Condition } from '~/composables/useWeatherQuery';

defineProps<{ condition?: Condition }>();
</script>

<template>
	<img v-if="condition" :src="`http:${condition.icon}`" :alt="condition.text">
</template>

<style scoped>

</style>