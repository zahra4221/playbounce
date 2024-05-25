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
  import { ref, inject } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const isLoggedIn = inject('isLoggedIn');
  const router = useRouter();
  
  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email.value,
        password: password.value,
      });
  
      if (response && response.data) {
        alert('Connexion réussie !');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('role', response.data.role);
        isLoggedIn.value = true;
        router.push('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
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
    display: inline-block; 
  }
  
  .login_fond {
    display: block;
    max-width: 100%;
    height: auto;
    padding-top: 20%;
  }
  
  .form-container {
    position: absolute;
    top: 60%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    width: 80%; 
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
    background-color: #F83D3D;
  }
  </style>
  