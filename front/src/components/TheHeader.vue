<template>
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
                    <li class="border_nav general"><router-link to="/reservation">Réservation</router-link></li>
                    <li class="border_nav match_score"><router-link to="/score">Score</router-link></li>
                    <li class="border_nav general"><router-link to="/gallerie">Gallerie</router-link></li>
                    <li class="border_nav general" v-if="!isLoggedIn"><router-link to="/login">Connexion</router-link></li>
                    <li class="border_nav general" v-if="isLoggedIn" @click="logout">Déconnexion</li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
const isLoggedIn = ref(!!localStorage.getItem('token'));
const router = useRouter();

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    isLoggedIn.value = false;
    router.push('/login'); 
}
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
    height: 200vh;
}

.header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
}

.logo img {
    height: 50px;
    width: auto;
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
    margin: 0%;
    padding: 0%;
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
    font-size: 24px;
    border: none;
    background: none;
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
        position: relative;
        left: -5%;
        top: 5%;
        margin: 0;
        text-align: center;
        background-color: white;
        width: 100%;
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
}
</style>
