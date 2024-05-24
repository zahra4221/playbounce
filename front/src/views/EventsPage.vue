<template>
  <div class="carousel-container">
    <div class="carousel">
      <div class="arrow left-arrow" @click="prevSlide">&#9664;</div>
      <div class="slides">
        <div
          class="slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ center: index === currentIndex }"
        >
          <div class="content">
            <div class="image-container">
              <img :src="slide.image" :alt="slide.title" />
            </div>
            <div class="overlay">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow right-arrow" @click="nextSlide">&#9654;</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const slides = ref([
  {
    image: '../../src/assets/defile1.png',
    title: 'Fluo Contest',
    description: "L'événement sportif avec des maillots fluorescents est une compétition ou un tournoi où les participants portent des maillots de couleurs vives qui brillent dans l'obscurité."
  },
  {
    image: '../../src/assets/defile2.png',
    title: 'Tournoi 3x3',
    description: "le tournoi de basket 3x3 le plus explosif de la ville ! Réunissant des équipes de joueurs passionnés de tous niveaux, cet événement célèbre la culture streetball dans une ambiance vibrante et compétitive."
  },
  {
    image: '../../src/assets/defile3.png',
    title: 'DJ Steasy',
    description: "La talentueuse DJ qui met le feu à vos événements sportifs préférés ! Avec sa passion pour la musique et le sport, DJ Sportive Spin crée une atmosphère électrique qui stimule les joueurs et inspire les spectateurs."
  }
]);

const currentIndex = ref(0);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 25%;

  overflow: hidden;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/events.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel {
  display: flex;
  align-items: center;
  position: relative;
}

.arrow {
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 10;
}

.slides {
  display: flex;
  gap: 40px;
  position: relative;
}

.slide {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  flex: 0 0 30%;
  transform: scale(1);
  opacity: 0.5;
}

.slide.center {
  transform: scale(1.2);
  opacity: 1;
  z-index: 1;
}

.content {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

img {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

.overlay {
  text-align: center;
  color: white;
  padding: 1rem 0;
}

h2,
p {
  margin: 0.5rem 0;
}

/* Tablet and Mobile view */
@media (max-width: 768px) {
  .carousel-container {
    height: auto;
    overflow: auto;
    padding: 10px;
  }

  .carousel {
    flex-direction: column;
    height: auto;
  }

  .slides {
    flex-direction: column;
    gap: 20px;
    padding: 0 10px;
  }

  .slide {
    flex: 1 0 auto;
    opacity: 1;
    width: 100%;
  }

  .slide.center {
    transform: none;
  }

  .arrow {
    display: none;
  }
}
</style>
