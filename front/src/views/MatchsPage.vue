<template>
  <div class="container">
    <div class="titre_basket">
      <h2>Les matchs</h2>
    </div>

    <div v-if="matchs.length === 0">Aucun match disponible.</div>
    <div v-else>
      <div v-for="match in matchs" :key="match._id">
        <div class="match">
        <p class="match-date">Date: {{ new Date(match.date).toLocaleString() }} - {{ match.sport }}</p>

        <div class="team-logos">
          <img :src="getLogoUrl(match.team1Logo)" alt="Logo Équipe 1" class="team-logo">
          <span>VS</span>
          <img :src="getLogoUrl(match.team2Logo)" alt="Logo Équipe 2" class="team-logo">
        </div>
        <div class="scores">
          <span>{{ match.team1 }}</span>
          <span>{{ match.team2 }}</span>
        </div>
        <button class="button_basket" @click="openReservationModal(match)">Réserver ce match</button>
      </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeReservationModal">&times;</span>
        <h3>Réserver le match: {{ selectedMatch.team1 }} VS {{ selectedMatch.team2 }}</h3>
        <form @submit.prevent="reserveMatch">
          <div class="form-group">
            <label for="numPeople">Nombre de personnes :</label>
            <input type="number" id="numPeople" v-model="numPeople" min="1" required />
          </div>
          <div v-for="(person, index) in people" :key="index" class="form-group">
            <h4>Personne {{ index + 1 }}</h4>
            <label for="firstName">Prénom :</label>
            <input type="text" v-model="person.firstName" required />
            <label for="name">Nom :</label>
            <input type="text" v-model="person.name" required />
            <label for="email">Email :</label>
            <input type="email" v-model="person.email" required />
            <label for="age">Âge :</label>
            <input type="number" v-model="person.age" min="0" required />
          </div>
          <div class="total">
            <p>Total à payer : {{ totalCost }} € (à payer à l'accueil)</p>
          </div>
          <button type="submit">Confirmer la réservation</button>
        </form>
        <div v-if="reservationError" class="error-message">{{ reservationError }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const matchs = ref([]);
const showModal = ref(false);
const selectedMatch = ref({});
const numPeople = ref(1);
const people = ref([{ firstName: '', name: '', email: '', age: 0 }]);
const router = useRouter();
const pricePerPerson = 12;
const reservationError = ref('');

const fetchMatchs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/matchs');
    matchs.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements :', error);
  }
};

const openReservationModal = (match) => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Vous devez être connecté pour effectuer une réservation.');
    router.push('/login');
  } else {
    selectedMatch.value = match;
    showModal.value = true;
  }
};

const closeReservationModal = () => {
  showModal.value = false;
  numPeople.value = 1;
  people.value = [{ firstName: '', name: '', email: '', age: 0 }];
  reservationError.value = '';
};

const getLogoUrl = (logoPath) => {
  return `http://localhost:3000/${logoPath}`;
};

watch(numPeople, (newNumPeople) => {
  const newPeople = [];
  for (let i = 0; i < newNumPeople; i++) {
    newPeople.push({ firstName: '', name: '', email: '', age: 0 });
  }
  people.value = newPeople;
});

const totalCost = computed(() => {
  return numPeople.value * pricePerPerson;
});

const reserveMatch = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push({ name: 'login' });
  } else {
    try {
      const response = await axios.post(`http://localhost:3000/api/reserve/${selectedMatch.value._id}`, {
        numPeople: numPeople.value,
        people: people.value
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Réservation réussie:', response.data);
      alert('Réservation réussie !');
      closeReservationModal();
    } catch (error) {
      console.error('Erreur lors de la réservation :', error.response ? error.response.data : error.message);
      reservationError.value = error.response ? error.response.data.message : 'Erreur lors de la réservation, veuillez réessayer.';
    }
  }
};

onMounted(fetchMatchs);
</script>

<style scoped>
/* Stylez votre composant comme vous le faisiez auparavant */
.container {
  text-align: center;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/match_back.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300vh;
  padding-top: 10%;
}

.titre_basket h2 {
  background-color: white;
  display: inline-block;
  padding: 10px 35px;
  border-radius: 5px;
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
.first_pic {
  width: 100%;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10%;
  padding: 2%;
  color: white;
  background-color: rgba(0, 0, 0, 0.62); 
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

.match-date {
  margin-top: 10px;
  font-size: 1.2rem;
}

.button_basket {
  border-radius: 22px;
  padding: 2%;
  background-color: rgba(109, 185, 255, 0.5);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background-color: #fff;
  padding: 1rem; /* Réduire le padding pour diminuer la hauteur */
  width: 70%;
  max-width: 400px; /* Réduire la largeur maximale de la modal */
  max-height: 90%; /* Ajouter une hauteur maximale pour la modal */
  overflow-y: auto; /* Permettre le défilement si le contenu dépasse */
  animation: slideIn 0.4s ease-in-out;
  position: relative;
}

.form-group {
  margin-bottom: 1rem; /* Réduire la marge pour diminuer la hauteur */
}

h3 {
  margin-bottom: 1rem; /* Réduire la marge pour diminuer la hauteur */
}

input {
  padding: 0.5rem; /* Réduire le padding pour diminuer la hauteur */
}

button[type="submit"] {
  padding: 0.5rem; /* Réduire le padding pour diminuer la hauteur */
}

@keyframes fadeIn {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #aaa;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.total {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #218838;
}
</style>
