<template>
  <div class="app-wrapper">
    <UserElement />
  </div>
</template>

<script setup>
import UserElement from "./components/UserElement.vue";
import {onMounted, onUnmounted, provide, ref} from "vue";

const isMobile = ref(false)

function updateIsMobile() {
  isMobile.value = window.innerWidth < 700
}

onMounted(() => {
  updateIsMobile()                                  // ustaw na starcie
  window.addEventListener('resize', updateIsMobile) // od teraz słuchaj zmian
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})


provide('isMobile', isMobile)

</script>

<style scoped>
.app-wrapper{
  padding: 40px 16px 20px;
  width: 100%;
}
</style>
