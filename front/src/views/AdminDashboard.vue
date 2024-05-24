<template>
  <div class="admin-dashboard">
    <div class="header">
      <h1>Tableau de Bord Administrateur</h1>
      <p>Bienvenue sur le tableau de bord admin !</p>
    </div>

    <div class="add-match">
      <h2>Ajouter un Match</h2>
      <form @submit.prevent="addMatch">
        <div class="form-group">
          <label for="sport">Sport :</label>
          <select id="sport" v-model="sport" required>
            <option value="BASKET">BASKET</option>
            <option value="FOOTBALL">FOOTBALL</option>
          </select>
        </div>
        <div class="form-group">
          <label for="team1">Équipe 1 :</label>
          <input type="text" id="team1" v-model="team1" required />
          <label for="team1Logo">Logo Équipe 1 :</label>
          <input type="file" id="team1Logo" @change="onFileChange($event, 'team1Logo')" required />
        </div>
        <div class="form-group">
          <label for="team2">Équipe 2 :</label>
          <input type="text" id="team2" v-model="team2" required />
          <label for="team2Logo">Logo Équipe 2 :</label>
          <input type="file" id="team2Logo" @change="onFileChange($event, 'team2Logo')" required />
        </div>
        <div class="form-group">
          <label for="date">Date :</label>
          <input type="datetime-local" id="date" v-model="date" required />
        </div>
        <div class="form-group">
          <label for="location">Lieu :</label>
          <input type="text" id="location" v-model="location" required />
        </div>
        <button type="submit">Ajouter le match</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>

    <div class="update-score">
      <h2>Ajouter un Score</h2>
      <form @submit.prevent="updateScore">
        <div class="form-group">
          <label for="match">Sélectionnez un Événement :</label>
          <select id="match" v-model="selectedMatch" required>
            <option v-for="match in matchs" :key="match._id" :value="match._id">
              {{ match.team1 }} vs {{ match.team2 }} - {{ new Date(match.date).toLocaleString() }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="team1Score">{{ team1Name }} Score :</label>
          <input type="number" id="team1Score" v-model="team1Score" required />
        </div>
        <div class="form-group">
          <label for="team2Score">{{ team2Name }} Score :</label>
          <input type="number" id="team2Score" v-model="team2Score" required />
        </div>
        <button type="submit">Mettre à Jour le Score</button>
      </form>
    </div>

    <div class="delete-match">
      <h2>Supprimer un Match</h2>
      <form @submit.prevent="deleteMatch">
        <div class="form-group">
          <label for="deleteMatch">Sélectionnez un Match :</label>
          <select id="deleteMatch" v-model="deleteMatchId" required>
            <option v-for="match in matchs" :key="match._id" :value="match._id">
              {{ match.team1 }} vs {{ match.team2 }} - {{ new Date(match.date).toLocaleString() }}
            </option>
          </select>
        </div>
        <button type="submit">Supprimer le Match</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const sport = ref('');
const team1 = ref('');
const team2 = ref('');
const date = ref('');
const location = ref('');
const team1Logo = ref(null);
const team2Logo = ref(null);
const errorMessage = ref('');
const matchs = ref([]);
const selectedMatch = ref('');
const team1Score = ref(0);
const team2Score = ref(0);
const deleteMatchId = ref('');

const fetchMatchs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/matchs');
    matchs.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs :', error);
  }
};

const onFileChange = (event, team) => {
  const file = event.target.files[0];
  if (team === 'team1Logo') {
    team1Logo.value = file;
  } else if (team === 'team2Logo') {
    team2Logo.value = file;
  }
  console.log('File selected for', team, file);
};

const addMatch = async () => {
  const formData = new FormData();
  formData.append('sport', sport.value);
  formData.append('team1', team1.value);
  formData.append('team2', team2.value);
  formData.append('date', date.value);
  formData.append('location', location.value);
  formData.append('team1Logo', team1Logo.value);
  formData.append('team2Logo', team2Logo.value);

  if (!team1Logo.value || !team2Logo.value) {
    alert('Please select both team logos.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/api/matchs/add', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Événement ajouté avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'événement :', error.response ? error.response.data : error.message);
    errorMessage.value = error.response ? error.response.data.error : error.message;
  }
};

const updateScore = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:3000/api/matchs/score/${selectedMatch.value}`, {
      team1Score: team1Score.value,
      team2Score: team2Score.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Score mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du score :', error.response ? error.response.data : error.message);
    alert('Erreur lors de la mise à jour du score, veuillez réessayer.');
  }
};

const deleteMatch = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/matchs/${deleteMatchId.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    alert('Match supprimé avec succès !');
    fetchMatchs(); // Refresh the matches list after deletion
  } catch (error) {
    console.error('Erreur lors de la suppression du match :', error.response ? error.response.data : error.message);
    alert('Erreur lors de la suppression du match, veuillez réessayer.');
  }
};

const team1Name = computed(() => {
  const match = matchs.value.find(e => e._id === selectedMatch.value);
  return match ? match.team1 : '';
});

const team2Name = computed(() => {
  const match = matchs.value.find(e => e._id === selectedMatch.value);
  return match ? match.team2 : '';
});

onMounted(fetchMatchs);
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #333;
  font-size: 2.5rem;
}

.header p {
  color: #666;
  font-size: 1.2rem;
}

.add-match, .update-score, .delete-match {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #007bff;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
