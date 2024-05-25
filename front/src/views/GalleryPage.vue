<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="(item, index) in items" :key="index">
      <div class="carousel__item">
        <img :src="item.image" :alt="item.title" class="carousel-image" />
      </div>
    </Slide>
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
  <div class="gallery">
    <div class="gallery-item" v-for="img in galleryImages" :key="img">
      <img :src="img" class="gallery-image" />
    </div>
  </div>
</template>

<script setup>
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import defile1 from '../assets/basket1.png'
import defile2 from '../assets/foot1.png'
import defile3 from '../assets/gallerie.png'
import gal2 from '../assets/gal2.png'
import gal3 from '../assets/gal3.png'
import gal4 from '../assets/gal4.png'
import gal5 from '../assets/gal5.png'
import gal6 from '../assets/gal6.jpg'
import gal7 from '../assets/gal7.png'


const items = [
  { image: defile1 },
  { image: defile2 },
  { image: defile3 }
]

const galleryImages = [gal2, gal3, gal4, gal5, gal6, gal7]
</script>

<style scoped>
.carousel__item {
  display: flex;
  color: white;
  text-align: center;
}

.carousel-image {
  width: 100%;
  border-radius: 0px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap:10px;
  margin: 5%;
}

.gallery-item {
  width: 32%; 
  margin-bottom: 20px;
}

.gallery-image {
  width: 100%;
  border-radius: 8px;
}
</style>
