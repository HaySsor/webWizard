<template>
  <div class="user-element">
    <UserBanner v-if="!error" :data="data?.data" :isLoading="loading"/>
    <UserAbout v-if="!error" :data="data?.data" :isLoading="loading"/>

    <ErrorPage v-if="error" :error="error"/>
  </div>
</template>

<script setup>
import UserBanner from "./UserBanner.vue";
import UserAbout from "./UserAbout.vue";
import {useFetchData} from "../helpers/useFetchData.js";
import ErrorPage from "./ErrorPage.vue";
import {onMounted} from "vue";

const LINK = 'https://webwizards.home.pl/jacek/frontend-task/api/user/'

const {data, error, loading, fetchData} = useFetchData(LINK)

onMounted(fetchData)

</script>

<style scoped lang="scss">
.user-element {
  display: flex;
  flex-direction: column;
  max-width: 1344px;
  margin: 0 auto;
}
</style>