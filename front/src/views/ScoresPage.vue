<template>
  <div class="container">
    <h2>Scores des Événements</h2>
    <div v-if="matchs.length === 0">Aucun événement disponible.</div>
    <div v-else>
      <div v-for="match in matchs" :key="match._id" class="match">
        <div class="team-logos">
          <img :src="getLogoUrl(match.team1Logo)" alt="Logo Équipe 1" class="team-logo">
          <span>VS</span>
          <img :src="getLogoUrl(match.team2Logo)" alt="Logo Équipe 2" class="team-logo">
          
        </div>
        <div class="scores">
          <span>{{ match.team1 }}: {{ match.score.team1Score }}</span>
          <span>{{ match.team2 }}: {{ match.score.team2Score }}</span>

        </div>
        <button class="button_basket" @click="openReservationModal(match)">Réserver ce match</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const matchs = ref([]);

const fetchMatchs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/matchs');
    matchs.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements :', error);
  }
};

const getLogoUrl = (logoPath) => {
  return `http://localhost:3000/${logoPath}`;
};

onMounted(fetchMatchs);
</script>

<style scoped>
.container {
  text-align: center;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/score_back.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  padding-top: 5%;
}

.button_basket{
  border-radius: 22px;
  padding: 2%;
  background-color:  rgba(109, 185, 255, 0.5); 
  color: white;
  font-size: 1rem;
}

h2 {
  background-color: white;
  display: inline-block;
  padding: 10px 35px;
  border-radius: 5px;
  margin-bottom: 2rem;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 10%; 
  padding: 2%;
  color: white;
  background-color: rgba(0, 0, 0, 0.62); /* Black with 62% opacity */
  border-radius: 10px;
}

.team-logos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.team-logo {
  height: 50px;
  margin: 0 10px;
}

.match-date, .match-location {
  margin-top: 10px;
  font-size: 1.2rem;
}

.scores {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  font-weight: bold;
  width: 100%;
}

.scores span {
  font-size: 1.5rem;
}
</style>
