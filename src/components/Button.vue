<template>
    <button class="button">
      <slot></slot>
    </button>
</template>

<script setup>
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: var(--accent-color);
  font-size: 1.2rem;
  padding: 3px 4px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--hover-accent-color);
  }
}
</style>