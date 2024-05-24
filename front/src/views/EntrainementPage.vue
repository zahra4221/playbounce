<template>
    <div class="container">
      <img class="foot_pic" src="../assets/terrain1.png" alt="Background">
      <div class="pic_contain">
        <div class="foot_text">
          <h2>Basketball Air</h2>
          <p>Sur ce terrain, le plaisir du sport se mêle à la compétition amicale, offrant une expérience immersive et inoubliable à chaque joueur</p>
          <button class="reserve-button" @click="openReservationModal">Réserver</button>
        </div>
        <img class="foot_pic_2" src="../assets/terrain1.1.png">
      </div>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeReservationModal">&times;</span>
          <h3>Réserver le terrain</h3>
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
        const response = await axios.post('http://localhost:3000/api/trainingReservations', {
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
    margin-top: 8%;

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
      font-size: 12px;
    }
    .foot_text h2 {
      font-size: 22px;
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
    z-index: 1;
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
    margin-bottom: 1rem;
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
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  