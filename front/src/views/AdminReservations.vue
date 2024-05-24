<template>
    <div class="container">
      <h2>Réservations</h2>
      <div v-if="reservations.length === 0">Aucune réservation disponible.</div>
      <div v-else>
        <div v-for="(reservation, index) in reservations" :key="index" class="reservation">
          <h3>Événement : {{ reservation.eventName }}</h3>
          <div v-for="(person, index) in reservation.people" :key="index" class="person">
            <p>Prénom: {{ person.firstName }}</p>
            <p>Nom: {{ person.name }}</p>
            <p>Email: {{ person.email }}</p>
            <p>Âge: {{ person.age }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const reservations = ref([]);
  
  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/events/reservations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      reservations.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  };
  
  onMounted(fetchReservations);
  </script>
  
  <style scoped>
  .container {
    padding: 2rem;
    text-align: center;
  }
  
  .reservation {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  
  .reservation h3 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
  }
  
  .person p {
    margin: 0.5rem 0;
  }
  </style>
  