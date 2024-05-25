<template>
  <div class="background">
    <button @click="prev" class="nav-button left">❮</button>
    <button @click="next" class="nav-button right">❯</button>
    <main id="carousel">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :style="getStyle(index)"
      >
        <img :src="item.image" alt="" class="item-image" />
        <h3 class="item-title">{{ item.title }}</h3>
        <p class="item-text">{{ item.text }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import defile1 from '../assets/defile1.png';
import defile2 from '../assets/defile2.png';
import defile3 from '../assets/defile3.png';

const currentPosition = ref(2);

const items = [
  {
    image: defile1,
    title: 'Fluo Contest',
    text: "L'événement sportif avec des maillots fluorescents est une compétition ou un tournoi où les participants portent des maillots de couleurs vives qui brillent dans l'obscurité.",
  },
  {
    image: defile2,
    title: 'Tournoi 3x3',
    text: 'Le tournoi de basket 3x3 le plus explosif de la ville ! Réunissant des équipes de joueurs passionnés de tous niveaux, cet événement célèbre la culture streetball dans une ambiance vibrante et compétitive.',
  },
  {
    image: defile3,
    title: 'DJ Steasy',
    text: 'La talentueuse DJ qui met le feu à vos événements sportifs préférés ! Avec sa passion pour la musique et le sport, DJ Sportive Spin crée une atmosphère électrique qui stimule les joueurs et inspire les spectateurs.',
  },
];

const setPosition = (position) => {
  currentPosition.value = position;
};

const prev = () => {
  if (currentPosition.value > 1) {
    currentPosition.value -= 1;
  } else {
    currentPosition.value = items.length;
  }
};

const next = () => {
  if (currentPosition.value < items.length) {
    currentPosition.value += 1;
  } else {
    currentPosition.value = 1;
  }
};

const getStyle = (index) => {
  const offset = index + 1;
  const r = currentPosition.value - offset;
  const abs = Math.max(r * -1, r);
  return {
    '--offset': offset,
    '--r': r,
    '--abs': abs,
  };
};
</script>

<style scoped>

.background{
  background-image: url('../assets/events.png');
  height:1024px;
  width:100%;
}
body {
  height: 600px;
  margin: 0;
  display: grid;
  grid-template-rows: 500px 100px;
  grid-template-columns: 1fr 30px 30px 30px 30px 30px 1fr;
  align-items: center;
  justify-items: center;
}

main#carousel {
  grid-row: 1 / 2;
  grid-column: 1 / 8;
  width: 100vw;
  height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 630px;
  --items: 5;
  --middle: 3;
  --position: 1;
  pointer-events: none;
}

div.item {
  position: absolute;
  width: 300px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 20px;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  --r: calc(var(--position) - var(--offset));
  --abs: max(calc(var(--r) * -1), var(--r));
  transition: all 0.25s linear;
  transform: rotateY(calc(-10deg * var(--r))) translateX(calc(-350px * var(--r))); /* Adjusted for spacing */
  z-index: calc((var(--position) - var(--abs)));
}

.item-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  margin-bottom: 10px;
}

.nav-button {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  background-color: #3DCBF8;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 18px;
  border-radius: 50%;
}

.nav-button.left {
  left: 70px;
}

.nav-button.right {
  right: 40px;
}

.radio-wrapper {
  display: none;
}

div.item:nth-of-type(1) {
  --offset: 1;
}
div.item:nth-of-type(2) {
  --offset: 2;
}
div.item:nth-of-type(3) {
  --offset: 3;
}
div.item:nth-of-type(4) {
  --offset: 4;
}
div.item:nth-of-type(5) {
  --offset: 5;
}
</style>
