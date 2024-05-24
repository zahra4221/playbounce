<template>
  <div>
    <div class="header">
      <button class="hamburger" @click="toggleMenu">&#9776;</button>
      <router-link to="/">
        <div class="logo">
          <img src="../assets/logo.png" alt="Logo">
        </div>
      </router-link>
      <div class="page-content">
        <nav>
          <ul :class="{ 'show': menuOpen }">
            <li class="border_nav general"><router-link to="/evenements">Événements</router-link></li>
            <li class="border_nav match_score"><router-link to="/matchs">Matchs</router-link></li>
            <li class="border_nav general"><router-link to="/entrainement">Réservation</router-link></li>
            <li class="border_nav match_score"><router-link to="/scores">Scores</router-link></li>
            <li class="border_nav general"><router-link to="/gallerie">Gallerie</router-link></li>
            <li class="border_nav general" v-if="isLoggedIn && isAdmin"><router-link to="/admin/dashboard">Dashboard</router-link></li>
            <li class="border_nav general" v-if="isLoggedIn && isAdmin"><router-link to="/admin/reservations">Terrains</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="user-menu">
        <img src="../assets/user-icon.png" class="user-icon" alt="User" @click="toggleUserMenu">
        <div v-if="userMenuOpen" class="user-dropdown">
          <router-link v-if="!isLoggedIn" to="/inscription">Inscription</router-link>
          <router-link v-if="!isLoggedIn" to="/login">Connexion</router-link>
          <button><router-link v-if="isLoggedIn" to="/mes-reservations">Mes Réservations</router-link></button>
          <button v-if="isLoggedIn" @click="logout" class="logout-button">Déconnexion</button>
        </div>
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
const userMenuOpen = ref(false); // State for user menu dropdown
const isLoggedIn = inject('isLoggedIn');
const userRole = inject('userRole');
const router = useRouter();

const isAdmin = computed(() => isLoggedIn.value && userRole.value === 'admin');

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');
  isLoggedIn.value = false;
  userRole.value = null;
  router.push('/login');
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed; /* Make the header fixed */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the header is on top */
  background-color: white; /* Add background color to avoid content behind it */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better visibility */
  height: 60px; /* Define a fixed height for the header */
  box-sizing: border-box;
}

.main-content {
  margin-top: 60px; /* Add top margin equal to the header height */
}

.logo img {
  height: 50px;
  width: auto;
}

.page-content {
  flex-grow: 1;
}

nav ul li.border_nav.general a {
  text-decoration: underline solid #3dcbf8 2px;
  text-underline-offset: 3px;
}

nav ul li.border_nav.match_score a {
  text-decoration: underline solid #f83d3d 2px;
  text-underline-offset: 3px;
}

nav ul li.border_nav a:hover,
nav ul li.border_nav a:active {
  background-color: #e3e3e3;
}

nav ul li.border_nav a {
  text-decoration: none;
  display: block;
  border-radius: 10px;
  padding: 12px 20px;
  transition: background-color 0.3s;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  flex-grow: 1;
  transition: transform 0.1s ease-in-out;
}

nav ul li {
  padding: 5px 0;
  margin: 2%;
}

.hamburger {
  display: none;
  font-size: 20px;
  border: none;
  background: none;
}

.user-menu {
  position: relative;
  margin-left: auto; /* Ensure the user menu is aligned to the right */
}

.user-icon {
  width: 70px;
  cursor: pointer;
}

.user-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
}

.user-dropdown a, .user-dropdown .logout-button {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
}

.user-dropdown a:hover, .user-dropdown .logout-button:hover {
  background-color:none;
  cursor: pointer;
  color:red
}

@media (max-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
  }

  .logo {
    order: 1;
    margin-right: auto;
  }

  .hamburger {
    display: block;
    order: 2;
    margin-right: 20px;
  }

  nav ul {
    display: none;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: white;
    text-align: center;
  }

  nav ul li {
    padding: 0;
    margin: 0;
  }

  nav ul.show {
    display: flex;
  }

  nav ul li.border_nav a {
    padding: 5px;
  }

  nav ul li.border_nav a:hover,
  nav ul li.border_nav a:active {
    background-color: transparent;
  }

  .user-menu {
    order: 3;
    margin-right: 20px;
  }
}
</style>
