

<template>
    <div class="error-page">
      <img src="/error_page.svg" alt="ilustracja pokazująca błąd">

      <span>Coś poszło nie tak, nie powiem wam kto zawinił, spróbuj odświeżyć :)</span>
    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.error-page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;

  img{
    height: 400px;
  }

  span{
    font-size: 2rem;
    font-weight: 500;
  }
}
</style>