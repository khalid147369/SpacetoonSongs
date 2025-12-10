<template>
  <div class="slider-wrapper">
    <swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="0"
      navigation
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      loop
      class="my-swiper h-80"
    >
      <swiper-slide>
        <img src="../assets/imgs/eren.png" alt="eren" class="slider-image" />
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/imgs/naasa.png"
          alt="naruto&sasuke"
          class="slider-image"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/imgs/dem.png"
          alt="demon slier"
          class="slider-image"
        />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/imgs/na.png" alt="Na" class="slider-image" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
</script>

<style>
/* wrapper يضمن تمركز السلايدر و مساحة أفقية مناسبة */
.slider-wrapper {
  display: flex;
  justify-content: center; /* يوسّط السلايدر أفقياً */
  padding: 30px 12px; /* تقدر تغير البادينج */
}

.my-swiper {
  width: 100%;
  max-width: 1200px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}

.slider-image {
  width: 90%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

/* كل سلايد عنصر flex لتمركز الصورة داخل الإطار */
.my-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* توسيط pagination bullets بدقة */
.my-swiper .swiper-pagination {
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
}

/* اضبط أزرار التنقل (الأسهم) عمودياً مركزين ومسافة أفقية مناسبة */
.my-swiper .swiper-button-prev,
.my-swiper .swiper-button-next {
  top: 50%;
  transform: translateY(-50%);
  color: white; /* اختياري: لون الأسهم */
  width: 36px;
  height: 36px;
}

/* لو محتاج الأسهم تبقى أقرب للصورة */
.my-swiper .swiper-button-prev {
  left: 8px;
}
.my-swiper .swiper-button-next {
  right: 8px;
}

/* Responsive tweaks — تقدر تعدل القيم */
@media (max-width: 768px) {
  .my-swiper {
    max-width: 100%;
    height: 300px;
  }
}
</style>
