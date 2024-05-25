<template>
  <div>
    <div class="header">
      <button class="hamburger" @click.stop="toggleMenu">&#9776;</button>
      <router-link to="/">
        <div class="logo">
          <img src="../assets/logo.png" alt="Logo">
        </div>
      </router-link>
      <div class="page-content">
        <nav>
          <ul :class="{ 'show': menuOpen }">
            <li class="border_nav general"><router-link to="/evenements" @click.native="closeMenuOnLinkClick">Événements</router-link></li>
            <li class="border_nav match_score"><router-link to="/matchs" @click.native="closeMenuOnLinkClick">Matchs</router-link></li>
            <li class="border_nav general"><router-link to="/entrainement" @click.native="closeMenuOnLinkClick">Réservation</router-link></li>
            <li class="border_nav match_score"><router-link to="/scores" @click.native="closeMenuOnLinkClick">Scores</router-link></li>
            <li class="border_nav general"><router-link to="/gallerie" @click.native="closeMenuOnLinkClick">Gallerie</router-link></li>
            <li class="border_nav general" v-if="isLoggedIn && isAdmin"><router-link to="/admin/dashboard" @click.native="closeMenuOnLinkClick">Dashboard</router-link></li>
            <li class="border_nav general" v-if="isLoggedIn && isAdmin"><router-link to="/admin/reservations" @click.native="closeMenuOnLinkClick">Terrains</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="user-menu">
        <img src="../assets/user-icon.png" class="user-icon" alt="User" @click.stop="toggleUserMenu">
        <div v-if="userMenuOpen" class="user-dropdown">
          <button class="close-button" @click.stop="toggleUserMenu">&times;</button>
          <router-link class="bouton_menu" v-if="!isLoggedIn" to="/inscription" @click.native="toggleUserMenu">Inscription</router-link>
          <router-link v-if="!isLoggedIn" to="/login" @click.native="toggleUserMenu">Connexion</router-link>
          <router-link class="bouton_menu" v-if="isLoggedIn" to="/mes-reservations" @click.native="toggleUserMenu">Mes Réservations</router-link>
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
const userMenuOpen = ref(false);
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

function closeMenuOnLinkClick() {
  if (menuOpen.value) {
    toggleMenu();
  }
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
  margin-top: 1%;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  position: relative;
  z-index: 3;
}


.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  display: none;
}

.logo img {
  height: 70px;
}

.page-content nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-content nav ul li {
  margin: 0 15px;
}

.page-content nav ul li a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.page-content nav ul li:nth-child(odd) a:hover {
  color: #F83D3D;
  border-radius: 12px;
}

.page-content nav ul li:nth-child(odd) a:hover::after {
  background-color: #F83D3D;
}

.page-content nav ul li:nth-child(even) a:hover {
  color: #3DCBF8;
}

.page-content nav ul li:nth-child(even) a:hover::after {
  background-color: #3DCBF8;
}

.page-content nav ul li a:hover::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
}
.page-content nav ul li:nth-child(odd) a::after,
.page-content nav ul li:nth-child(even) a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: transparent; /* Initialement transparent */
  transition: background-color 0.3s ease; /* Transition pour l'effet au survol */
}

.page-content nav ul li:nth-child(odd) a::after {
  background-color: #F83D3D; /* Couleur de fond rouge permanent */
}

.page-content nav ul li:nth-child(even) a::after {
  background-color: #3DCBF8; /* Couleur de fond bleu permanent */
}
@media (max-width: 768px) {
  /* Supprime les décorations sous les liens pour les appareils mobiles */
  .page-content nav ul li a::after {
    background-color: transparent !important; /* Force la transparence sur mobile */
  }}
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.user-icon {
  height: 40px;
  cursor: pointer;
}

.user-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.user-dropdown a,
.user-dropdown button {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}

.user-dropdown button {
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.bouton_menu:hover,
.bouton_menu:hover {
  background-color: #3DCBF8;
  color: white; 
}


.logout-button {
  color: #F83D3D;
  font-size: 1.1rem;
}

.logout-button:hover {
  background-color: #F83D3D;
  color: white;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  @media (max-width: 768px) {
  .page-content nav ul {
    flex-direction: column;
    width: 60%;
    background-color: #eeeeee;
    position: absolute;
    top: 90px;
    left: 0;
    padding: 0px 0;
    border-radius: 0 0 10px 10px;
    transform: translateX(-110%);
    transition: transform 0.5s ease;
    display: flex; 
  }

  .page-content nav ul.show {
    display: flex; 
    transform: translateX(0);
  }
}

  .page-content nav ul li {
    margin: 10px 0;
    text-align: center;
  }

  .page-content nav ul li a {
    display: block;
    padding: 10px;
    transition: background-color 0.3s ease;
  }

  .logo {
    display: none;
  }

  .user-menu {
    margin-left: auto;
  }
}

.close-button {
  display: flex;
  justify-content: flex-end;
  font-size: 35px;
  margin-top: -20%;
  margin-left: 50%;
  margin-bottom: -15%;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;

}

.close-button:hover {
  color: #F83D3D;
}

</style>