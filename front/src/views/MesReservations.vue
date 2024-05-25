<template>
  <div class="user-reservations">
    <h1 class="title">Mes Réservations</h1>

    <section class="reservations-section">
      <h2 class="section-title">Réservations de terrain</h2>
      <div v-if="trainingReservations.length > 0" class="reservations-container">
        <div v-for="reservation in trainingReservations" :key="reservation._id" class="reservation-card">
          <h3>Réservation pour le {{ reservation.date }} à {{ reservation.time }}</h3>
          <p><strong>Prénom:</strong> {{ reservation.firstName }}</p>
          <p><strong>Nombre de joueurs:</strong> {{ reservation.numPlayers }}</p>
        </div>
      </div>
      <p v-else class="no-reservation">Aucune réservation de terrain.</p>
    </section>

    <section class="reservations-section">
      <h2 class="section-title">Réservations de match</h2>
      <div v-if="matchReservations.length > 0" class="reservations-container">
        <div v-for="reservation in matchReservations" :key="reservation.matchId" class="reservation-card">
          <h3>Match: {{ reservation.team1 }} VS {{ reservation.team2 }}</h3>
          <p><strong>Date:</strong> {{ new Date(reservation.date).toLocaleString() }}</p>
          <p><strong>Nombre de personnes:</strong> {{ reservation.numPeople }}</p>
          <div v-for="person in reservation.people" :key="person._id" class="person-info">
            <p><strong>Personne:</strong> {{ person.firstName }} {{ person.name }}</p>
          </div>
        </div>
      </div>
      <p v-else class="no-reservation">Aucune réservation de match.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const trainingReservations = ref([]);
const matchReservations = ref([]);

const fetchUserReservations = async () => {
try {
  const token = localStorage.getItem('token');

  const trainingResponse = await axios.get(`${import.meta.env.VITE_APP_URL}/api/trainingReservations/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  trainingReservations.value = trainingResponse.data;

  const matchResponse = await axios.get(`${import.meta.env.VITE_APP_URL}/api/matchs/reservations/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  matchReservations.value = matchResponse.data;
} catch (error) {
  console.error('Erreur lors de la récupération des réservations :', error);
}
};

onMounted(fetchUserReservations);
</script>

<style scoped>
.user-reservations {
max-width: 800px;
margin: 20px auto;
padding: 20px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
border-radius: 10px;
background: rgba(61,203,240,0.3);
}

.title, .section-title {
text-align: center;
color: #333;
}

.reservations-section {
margin-top: 20px;
}

.reservations-container {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 20px;
}

.reservation-card {
background: #f9f9f9;
border: 1px solid #ddd;
padding: 15px;
border-radius: 8px;
transition: transform 0.3s ease-in-out;
}

.reservation-card:hover {
transform: translateY(-5px);
}

.person-info {
background: #eee;
padding: 10px;
margin-top: 5px;
border-radius: 5px;
}

.no-reservation {
text-align: center;
color: #888;
}
</style>
