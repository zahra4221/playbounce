<template>
    <div class="user-reservations">
      <h1>Mes Réservations</h1>
  
      <h2>Réservations de terrain</h2>
      <div v-if="trainingReservations.length > 0">
        <div v-for="reservation in trainingReservations" :key="reservation._id" class="reservation">
          <h3>Réservation pour le {{ reservation.date }} à {{ reservation.time }}</h3>
          <p><strong>Prénom:</strong> {{ reservation.firstName }}</p>
          <p><strong>Nombre de joueurs:</strong> {{ reservation.numPlayers }}</p>
        </div>
      </div>
      <div v-else>
        <p>Aucune réservation de terrain.</p>
      </div>
  
      <h2>Réservations de match</h2>
      <div v-if="matchReservations.length > 0">
        <div v-for="reservation in matchReservations" :key="reservation.matchId" class="reservation">
          <h3>Match: {{ reservation.team1 }} VS {{ reservation.team2 }}</h3>
          <p><strong>Date:</strong> {{ new Date(reservation.date).toLocaleString() }}</p>
          <p><strong>Nombre de personnes:</strong> {{ reservation.numPeople }}</p>
          <div v-for="person in reservation.people" :key="person._id">
            <p><strong>Personne:</strong> {{ person.firstName }} {{ person.name }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucune réservation de match.</p>
      </div>
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
  
      // Fetch training reservations
      const trainingResponse = await axios.get('http://localhost:3000/api/trainingReservations/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      trainingReservations.value = trainingResponse.data;
  
      // Fetch match reservations
      const matchResponse = await axios.get('http://localhost:3000/api/matchs/reservations/user', {
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
    padding: 2rem;
  }
  
  .reservation {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    width: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  