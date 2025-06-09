<template>
  <div class="user-about">
    <div
        class="user-about-box"
        :class="{ 'is-loading': isLoading }"
    >
      <template v-if="isLoading">
        <SkeletonLoader :count="isMobile ? 4 : 2" />
      </template>

      <template v-else>
        <div
            ref="contentRef"
            class="user-about-box-content"
            :style="contentStyle"
        >
          <p v-for="(paragraph, idx) in paragraphs" :key="idx">
            {{ paragraph }}
          </p>
        </div>

        <span
            v-if="isOverflowing"
            @click="toggleShowFull"
            class="user-about-box-button"
        >
          {{ showFull ? 'Zwiń opis' : 'Rozwiń opis' }}
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, nextTick, watch, inject} from 'vue';
import SkeletonLoader from "./SkeletonLoader.vue";

const isMobile = inject("isMobile");

const props = defineProps({
  data: Object,
  isLoading: Boolean,
});

const showFull = ref(false);
const contentRef = ref(null);

const collapsedHeight = ref(0);
const expandedHeight = ref(0);
const isOverflowing = ref(false);

const paragraphs = computed(() =>
    props.data?.about?.split(/\n\s*\n/) || []
);

const toggleShowFull = () =>  {
  showFull.value = !showFull.value;
}

const calculateHeights = async () => {
  await nextTick();

  const element = contentRef.value;
  if (!element) return;

  const firstParagraph = element.querySelector('p');
  if (firstParagraph) {
    const style = window.getComputedStyle(firstParagraph);
    const marginBottom = parseFloat(style.marginBottom);
    collapsedHeight.value = firstParagraph.offsetHeight + marginBottom;
  } else {
    collapsedHeight.value = 0;
  }

  expandedHeight.value = element.scrollHeight;

  isOverflowing.value = expandedHeight.value > collapsedHeight.value;

  if (!isOverflowing.value) {
    showFull.value = true;
  }
}

const contentStyle = computed(() => {
  if (collapsedHeight.value === 0 && expandedHeight.value === 0) {
    return {};
  }
  const height = showFull.value ? expandedHeight.value : collapsedHeight.value;
  return {
    maxHeight: `${height}px`,
  };
});

onMounted(() => {
  if (!props.isLoading) {
    calculateHeights();
  }
  window.addEventListener('resize', calculateHeights);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeights);
});

watch(() => [props.isLoading, props.data], ([loading]) => {
  if (!loading) {
    calculateHeights();
  }
});

</script>

<style scoped lang="scss">
.user-about {
  width: calc(100% - 40px);
  margin: 0 auto;

  &-box {
    background-color: var(--secondary);
    border-radius: 0 0 15px 15px;
    padding: 20px;
    position: relative;

    &.is-loading {
      height: 140px;
      overflow: hidden;

      @media (width > 700px) {
        height: 100px;
      }
    }

    &-content {
      overflow: hidden;
      transition: max-height 0.4s ease-in-out;
    }

    p {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      padding-inline: 10px;
      @media (width > 700px) {
        font-size: 1.6rem;
      }
    }

    &-button {
      display: inline-block;
      margin-top: 1rem;
      font-size: 1.4rem;
      color: white;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>