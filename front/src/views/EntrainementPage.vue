<template>
    <div class="container">
      <div class="container">
      <img class="foot_pic" src="../assets/terrain1.png" alt="Background">
      <div class="pic_contain">
        <div class="foot_text">
          <h2>Basketball Air</h2>
          <p>
            Découvrez le Basketball Air, une version dynamique et exaltante du basketball traditionnel.
Sur ce terrain unique, des trampolines sont intégrés directement sous les paniers, permettant aux joueurs de toutes compétences de vivre l'excitation de réaliser des dunks spectaculaires.  Parfait pour les groupes d'amis, les fêtes ou les événements d'entreprise, rejoignez-nous pour une expérience de jeu sans pareil où la compétition amicale rencontre l'innovation sportive!
</p>

          <button class="reserve-button" @click="openReservationModal">Réserver</button>
        </div>
        <img class="foot_pic_2" src="../assets/terrain1.1.png">
      </div>
      </div>
      <div class="container">
      <img class="foot_pic" src="../assets/terrain2.png" alt="Background">
      <div class="pic_contain">
        <div class="foot_text">
          <h2>Basketball</h2>
          <p>
  Découvrez notre <strong>terrain de basketball intérieur</strong>, un espace conçu pour les amateurs et les professionnels. Équipé d'un sol en parquet haut de gamme, ce terrain offre un amorti optimal et une excellente réponse sous le pied, permettant des performances de jeu améliorées et une expérience utilisateur supérieure. Que vous cherchiez à organiser des tournois ou simplement à jouer entre amis, notre terrain intérieur est le lieu idéal pour montrer vos compétences tout au long de l'année, indépendamment des conditions météorologiques extérieures.
</p>
          <button class="reserve-button" @click="openReservationModal">Réserver</button>
        </div>
        <img class="foot_pic_2" src="../assets/terrain2.1.png">
      </div>
      </div>
      <div class="container">
      <img class="foot_pic" src="../assets/terrain3.png" alt="Background">
      <div class="pic_contain">
        <div class="foot_text">
          <h2>FootBall</h2>
          <p>
  Plongez dans l'action sur notre <strong>terrain de football intérieur</strong>. Conçu avec un gazon artificiel de pointe, ce terrain simule parfaitement les conditions d'un terrain extérieur tout en offrant les avantages d'un espace couvert. Idéal pour les matchs en soirée ou les jours de pluie, il permet aux joueurs de profiter d'une surface de jeu constante et sûre. Organisez vos compétitions ou entraînements dans un environnement contrôlé où passion et sport se rencontrent pour créer une expérience inoubliable.
</p>
          <button class="reserve-button" @click="openReservationModal">Réserver</button>
        </div>
        <img class="foot_pic_2" src="../assets/terrain3.1.png">
      </div>
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeReservationModal">&times;</span>
          <h3>Réserver le terrain</h3>
          <p>Tarif selon votre profil, à consulter directement à la page tarif.</p>
          <form @submit.prevent="makeReservation">
            <div class="form-group">
            <label for="fieldType">Type de terrain :</label>
            <select id="fieldType" v-model="fieldType" class="form-control">
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Basket Air">Basket Air</option>
            </select>
          </div>
            <div class="form-group">
              <label for="firstName">Prénom :</label>
              <input type="text" id="firstName" v-model="firstName" required class="form-control" />
            </div>
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" id="email" v-model="email" required class="form-control" />
            </div>
            <div class="form-group">
              <label for="phone">Numéro de téléphone :</label>
              <input type="tel" id="phone" v-model="phone" required class="form-control" />
            </div>
            <div class="form-group">
              <label for="reservationDate">Date :</label>
              <input type="date" id="reservationDate" v-model="selectedDate" required class="form-control" />
            </div>
            <div class="form-group">
              <label for="reservationTime">Heure :</label>
              <select id="reservationTime" v-model="selectedTime" class="form-control">
                <option v-for="hour in availableHours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="numPlayers">Nombre de joueurs :</label>
              <input type="number" id="numPlayers" v-model="numPlayers" min="1" max="8" required class="form-control" />
            </div>
            <button type="submit">Effectuer la réservation</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const showModal = ref(false);
  const selectedDate = ref(null);
  const numPlayers = ref(1);
  const selectedTime = ref(null);
  const firstName = ref('');
  const email = ref('');
  const fieldType = ref('Football');
  const phone = ref('');
  const availableHours = ref([]);
  const router = useRouter();
  
  for (let hour = 10; hour <= 22; hour++) {
    availableHours.value.push(`${hour}:00`);
  }
  
  const openReservationModal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour effectuer une réservation.');
      router.push('/login');
      return;
    }
    showModal.value = true;
  };
  
  const closeReservationModal = () => {
    showModal.value = false;
  };
  
  const makeReservation = async () => {
    if (selectedDate.value && selectedTime.value && numPlayers.value && firstName.value && email.value && phone.value) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Vous devez être connecté pour effectuer une réservation.');
          return;
        }
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/trainingReservations`, {
          firstName: firstName.value,
          email: email.value,
          phone: phone.value,
          date: selectedDate.value,
          time: selectedTime.value,
          numPlayers: numPlayers.value,
          fieldType: fieldType.value,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Réservation confirmée. Payable directement sur place.');
        closeReservationModal();
      } catch (error) {
        alert('Erreur lors de la réservation : ' + (error.response?.data?.message || error.message));
      }
    } else {
      alert('Veuillez remplir tous les champs avant de réserver.');
    }
  };
  </script>
  

  
  <style scoped>
.container {
position: relative; 
width: 100%; 
margin-bottom: 15%;
}

  .foot_pic {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  .foot_text {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 5%;
    background-color: white;
    border-radius: 2%;
    margin-top: 5%;
    width: 50%;
    margin-right: 5%;
    margin-left: 5%;
  }
  
  .foot_text h2 {
    font-size: 40px;
    font-weight: 800;
  }
  
  .foot_text p {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  
  .foot_pic_2 {
    z-index: 1;
    width: 45%;
    margin-top: 10%;
  }
  
  .pic_contain {
    position: relative;
    display: flex;
    flex-direction: row;
  }
  
  @media (max-width: 768px) {
    .foot_text p {
      font-size:0.5rem;
    }
    .foot_text h2 {
      font-size: 14px;
    }
  }
  
  .reserve-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .reserve-button:hover {
    background-color: #0056b3;
  }
  
  .modal {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border: 1px solid #888;
    width: 70%;
    max-width: 400px;
    border-radius: 10px;
    box-sizing: border-box;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 0rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: bold;
  }
  
  input,
  select,
  .datepicker,
  .form-control {
    width: 100%;
    padding: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-bottom: 0rem;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 5%;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  