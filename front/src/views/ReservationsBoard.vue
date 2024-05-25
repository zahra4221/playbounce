<template>
  <div class="reservations-dashboard">
    <div class="header">
      <h1>Récapitulatif des réservations</h1>
    </div>
    <div v-for="match in matchs" :key="match._id" class="match-reservations">
      <h3>{{ match.team1 }} vs {{ match.team2 }} - {{ new Date(match.date).toLocaleString() }}</h3>
      <div v-if="match.reservations && match.reservations.length > 0">
        <div v-for="(reservation, index) in match.reservations" :key="index" class="reservation">
          <p><strong>Nombre de personnes:</strong> {{ reservation.numPeople }}</p>
          <div v-for="(person, idx) in reservation.people" :key="idx" class="person">
            <p><strong>Prénom:</strong> {{ person.firstName }}</p>
            <p><strong>Nom:</strong> {{ person.name }}</p>
            <p><strong>Email:</strong> {{ person.email }}</p>
            <p><strong>Âge:</strong> {{ person.age }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucune réservation pour cet événement.</p>
      </div>
    </div>

    <div class="header">
      <h1>Réservation des Terrains</h1>
    </div>
    <div v-if="trainingSessions.length > 0">
      <div v-for="session in trainingSessions" :key="session._id" class="training-session">
        <h3>Entraînement pour le {{ session.date }} à {{ session.time }}</h3>
        <p><strong>Prénom:</strong> {{ session.firstName }}</p>
        <p><strong>Email:</strong> {{ session.email }}</p>
        <p><strong>Numéro de téléphone:</strong> {{ session.phone }}</p>
        <p><strong>Nombre de joueurs:</strong> {{ session.numPlayers }}</p>
      </div>
    </div>
    <div v-else>
      <p>Aucun entraînement de terrain.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const matchs = ref([]);
const trainingReservations = ref([]);

const fetchReservations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/matchs');
    matchs.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations :', error);
  }
};
const trainingSessions = ref([]);

const fetchTrainingSessions = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/trainingReservations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    trainingSessions.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des entraînements :', error);
  }
};

onMounted(fetchTrainingSessions);

onMounted(() => {
  fetchReservations();
});
</script>
<style scoped>
.reservations-dashboard {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #284B63; 
  font-size: 2.5rem;
  font-weight: bold;
}

.training-session {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


h3 {
  color: #3DCBF8; 
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.reservation,
.person {
  background: #e9ecef;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  
}

.person {
  padding-left: 2rem;
  border-left: 3px solid #F83D3D;
}

p {
  font-size: 1.2rem;
  color: #333;
}

strong {
  color: #000;
}
</style>
