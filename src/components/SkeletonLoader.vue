<template>
  <div class="skeleton-wrapper">
    <div
        v-for="n in count"
        :key="n"
        class="skeleton-line"
        :style="lineStyle"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '1.4rem',
  },
});
const lineStyle = computed(() => ({
  width: props.width,
  height: props.height,
}));
</script>

<style scoped lang="scss">

.skeleton-wrapper {
  width: 100%;
}

.skeleton-line {
  margin-bottom: 1rem;
  background: rgba(238, 238, 238, 0.50);
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  // Ostatni element nie potrzebuje marginesu na dole
  &:last-child {
    margin-bottom: 0;
  }
}

.skeleton-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.6),
          transparent
  );
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
</style>