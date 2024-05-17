<template>
    <div class="container">
      <div class="login">
        <img class="login_fond" src="../assets/fond_login.png" />
        <form class="form-container" @submit.prevent="loginUser">
          <div class="form-group">
            <label for="email">Email :</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const password = ref('');
  
  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email.value,
        password: password.value,
      });
      alert('Connexion réussie !');
      // Stocker le token JWT et l'ID utilisateur localement pour l'authentification future
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      // Rediriger ou effectuer d'autres actions après la connexion réussie
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response.data);
      alert('Erreur lors de la connexion, veuillez réessayer.');
    }
  };
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    background: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
      ),
      url('../assets/login.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
  }
  
  .login {
    position: relative;
    display: inline-block; /* Adjust this as needed to control the form's positioning */
  }
  
  .login_fond {
    display: block;
    max-width: 100%;
    height: auto;
    padding-top: 20%;
  }
  
  .form-container {
    position: absolute;
    top: 60%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%);
    width: 80%; /* Adjust based on your image's aspect ratio */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type='email'],
  input[type='password'] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #000000;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0400ff;
  }
  </style>
  