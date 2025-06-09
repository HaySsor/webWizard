<template>
  <div class="user-banner">
    <div class="user-banner-img">
      <div v-if="isLoading" class="skeleton-avatar"></div>
      <img v-else loading="lazy" :src="imageSrc" :alt="data?.image?.filename"/>
    </div>
    <div class="user-banner-info">
      <div class="user-banner-info-name">
        <span v-if="!isLoading ">{{ data?.name }} {{ data?.surname }}</span>
        <SkeletonLoader v-else height="1.6rem"/>
      </div>
      <div class="user-banner-info-email">
        <span v-if="!isLoading">Email: <a :href="`mailto:${data?.emial}`">{{ data?.email }}</a></span>
        <SkeletonLoader v-else/>
      </div>

      <div class="user-banner-info-phone">
        <span v-if="!isLoading">Numer telefonu: {{ userPhone }}</span>
        <SkeletonLoader v-else/>
        <Button v-if="!isLoading && !isShowUserNumber" @click="handleShowUserNumber"
                class="user-banner-info-phone-button"> Pokaż telefon
        </Button>
      </div>
    </div>
    <div class="user-banner-actions">
      <Button v-if="!isLoading" @click="handleDownloadUserData" class="user-banner-actions-button">
           Pobierz dane użytkownika
      </Button>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import Button from "./Button.vue";
import SkeletonLoader from "./SkeletonLoader.vue";

const props = defineProps({
  data: Object,
  isLoading: Boolean,
})

const isShowUserNumber = ref(false)

const imageSrc = computed(() => {
  if(props?.data?.image){
    const {baseUrl, filename, extension} = props.data.image;
    return `${baseUrl}${filename}.${extension}`;
  }
})

const userPhone = computed(() => {
  const hideNumber = `XXXXXX${props?.data?.phone?.slice(6)}`;

  return isShowUserNumber.value ? `${props?.data?.phone}` : hideNumber
})

const handleDownloadUserData = () => {
  const dataToDownload = props.data;
  const jsonString = JSON.stringify(dataToDownload, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${props.data.name}_${props.data.surname}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const handleShowUserNumber = () => {
  isShowUserNumber.value = !isShowUserNumber.value;
}


</script>

<style scoped lang="scss">
.user-banner {
  width: 100%;
  background-color: var(--primary);
  border-radius: 15px;
  padding: 20px;
  display: grid;
  grid-template-columns: calc(30% + 20px) 1fr;
  grid-template-rows: 40px 1fr 1fr 1fr;
  position: relative;
  color: white;
  column-gap: 10px;
  box-shadow: var(--shadow);
  z-index: 2;

  @media (width > 444px){
    grid-template-columns: 120px 1fr;
  }

  @media (width > 700px){
    display: flex;
    height: 150px;

  }

  @media (width > 750px){
    display: flex;
    height: 190px;
    column-gap: 20px;
  }

  @media (width > 1000px){
    padding: 30px;
    height: 210px;
    column-gap: 30px;

  }

  &-img {
    width: 32%;
    aspect-ratio: 1/1;
    left: 20px;
    top: 20px;
    transform: translateY(-40px);
    position: absolute;

    img, .skeleton-avatar {
      width: 100%;
      height: 100%;
      min-width: 90px;
      min-height: 90px;
      object-fit: cover;
      border: 3px solid white;
      border-radius: 12px;
      max-width: 120px;
      max-height: 120px;
    }

    @media (width > 700px){
      position: relative;
      left: 0;
      top: 0;
      transform: translateY(-50px);
      img, .skeleton-avatar {
        width: 150px;
        height: 150px;
        max-height: unset;
        max-width: unset;
      }
    }

    @media (width > 750px){
      img, .skeleton-avatar {
        width: 200px;
        height: 200px;
        border-radius: 15px;
      }
    }

    @media (width > 1000px){
      transform: translateY(-70px);
      img, .skeleton-avatar {
        width: 220px;
        height: 220px;
      }
    }
  }

  &-info {
    display: contents;

    &-name {
      grid-column: 2/3;
      grid-row: 2/3;
      align-self: start;
      font-size: 1.8rem;
      font-weight: 600;
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-email {
      grid-column: 1/-1;
      grid-row: 3/4;
      margin-top: 20px;
      font-size: 1.4rem;

      a {
        text-decoration: none;
        color: var(--accent-color);

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &-phone {
      grid-column: 1/-1;
      grid-row: 4/-1;
      margin-top: 10px;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      gap: 5px;

      span{
        width: max-content;
      }

      &-button {
        font-size: 1.1rem;
      }
    }

    @media (width > 700px){
      display: flex;
      flex-direction: column;
      width: 100%;
      &-name {
        font-size: 2rem;
      }
      &-email {
        font-size: 1.8rem;
        margin-bottom: 5px;

      }
      &-phone {
        font-size: 1.8rem;
        gap: 8px;
      }
    }

    @media (width > 750px){
      display: flex;
      flex-direction: column;
      &-name {
        font-size: 2.6rem;
        margin-bottom: 10px;
      }
      &-phone {
        &-button{
          font-size: 1.2rem;
        }
      }
    }
  }

  &-actions {
    grid-row: 1/2;
    grid-column: 2/-1;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    overflow: hidden;

    &-button {
      height: max-content;
      border-radius: 5px 0 5px 0;

      @media (width > 600px){
        font-size: 1.4rem;
      }

      @media (width > 700px) {
        position: absolute;
        right: 20px;
        top: 20px;
      }

      @media (width > 750px){
        font-size: 1.5rem;
      }
    }
  }
}

.skeleton-avatar {
  background-color: rgba(238, 238, 238, 0.56);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
    );
    animation: shimmer 1.5s infinite;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

</style>