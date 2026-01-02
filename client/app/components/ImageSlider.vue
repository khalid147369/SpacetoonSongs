<script lang="ts" setup>
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useImagesStore } from "../../stores/imgs";

const imagesStore = useImagesStore();
const { images, loading } = storeToRefs(imagesStore);

onMounted(() => {
  imagesStore.fetchAll();
});
</script>
<template>
  <div
    v-if="loading"
    class="h-550px flex justify-center items-center text-white text-2xl"
  >
    Loading...
  </div>
  <swiper
    v-else
    :modules="[Navigation, Pagination, Autoplay]"
    :slides-per-view="1"
    :space-between="0"
    navigation
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    loop
    class="my-swiper w-full h-550px"
  >
    <swiper-slide v-for="img in images" :key="img._id">
      <NuxtImg
        :src="img.image"
        format="webp"
        width="1200"
        height="600"
        loading="eager"
        fetchpriority="high"
        :alt="img.title"
        class="slider-image"
      />
    </swiper-slide>
  </swiper>
</template>

<style>
.my-swiper {
  width: 100%;
  height: 550px;
  position: relative;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* كل سلايد عنصر flex لتمركز الصورة داخل الإطار */
.my-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.my-swiper .swiper-button-prev,
.my-swiper .swiper-button-next {
  top: 50%;
  transform: translateY(-50%);
  color: white;
  width: 36px;
  height: 36px;
}

.my-swiper .swiper-button-prev {
  color: transparent;
}
.my-swiper .swiper-button-next {
  color: transparent;
}
</style>
