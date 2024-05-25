<template>
  <div class="container">
    <section class="fullscreen content">
      <div class="contact_form">    
    
        <form v-if="showForm" @submit.prevent="submitForm">
          <h1>Nous contacter :</h1>
          <p class="contact_box box_style">
            Écrivez-nous pour en savoir plus, partager vos nouvelles idées, poser des questions, ou toute autre chose. Nous sommes impatients de vous lire !
          </p>
          <div class="contact">
            <div class="input-row">
              <div class="label-input-group">
                <label for="prenom" class="label-style">Prénom </label>
                <input type="text" id="prenom" v-model="prenom" placeholder="Votre prénom..." class="input-style" />
              </div>
              <div class="label-input-group">
                <label for="email" class="label-style">Email </label>
                <input type="email" id="email" v-model="email" placeholder="Votre email..." class="input-style" />
              </div>
            </div>
            <textarea id="message" v-model="message" placeholder="Votre message" class="textarea-style"></textarea>
            <button type="submit" class="box_style submit_bouton">Envoyer</button>
          </div>
        </form>
        <div v-if="successMessage && !showForm" class="success-message">
          <p>{{ successMessage }}</p>
          <button @click="redirectToHome" class="box_style accueil_bouton">Retour à l'accueil</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {  ref } from 'vue';



function redirectToHome() {
  // Utilisez router.push si vous utilisez Vue Router
  // router.push('/');
  // Sinon utilisez window.location pour rediriger
  window.location.href = '/';
}
const prenom = ref('');
const email = ref('');
const message = ref('');
const successMessage = ref('');
const showForm = ref(true);

function submitForm() {
    const formData = {
        prenom: prenom.value, 
        email: email.value,   
        message: message.value
    };

    fetch(`${import.meta.env.VITE_APP_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.ok ? response.json() : Promise.reject('Something went wrong'))
    .then(data => {
        console.log('Email envoyé avec succès:', data);
        successMessage.value = "Votre message a été envoyé avec succès. Merci de nous avoir contacté !"; // Mettre à jour le message de succès
        showForm.value = false; 
      })
    .catch(error => {
        console.error('Erreur lors de l envoi du formulaire:', error);
        successMessage.value = "Erreur lors de l'envoi de votre message. Veuillez réessayer plus tard."; // Gestion des erreurs
    });
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

.container {
  background-image: url('../assets/login.webp');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}

.fullscreen {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact_form {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  max-width: 600px;
  width: 70%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  color: #333;
  animation: fadeIn 1s ease-in-out;
}



@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  color: #007BFF;
}

.contact_box {
  margin-bottom: 20px;
  font-size: 1.1rem;
  text-align: center;
  color: #555;
}

.contact {
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
}

.label-input-group {
  flex: 1;
  margin-right: 10px;
}

.label-input-group:last-child {
  margin-right: 0;
}

.label-style {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #007BFF;
}

.input-style, .textarea-style {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-style:focus, .textarea-style:focus {
  border-color: #007BFF;
  outline: none;
}

.textarea-style {
  height: 150px;
  resize: none;
  margin-bottom: 20px;
}

.submit_bouton {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: linear-gradient(135deg, #007BFF, #00D4FF);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit_bouton:hover {
  background: linear-gradient(135deg, #0066CC, #00BFFF);
}

.success-message {
  text-align: center;
  color: #333;
  animation: fadeIn 1s ease-in-out;
}

.accueil_bouton {
  display: inline-block;
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: linear-gradient(135deg, #FF7E79, #FF3D3A);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.accueil_bouton:hover {
  background: linear-gradient(135deg, #FF5C58, #FF1C1A);
}
</style>