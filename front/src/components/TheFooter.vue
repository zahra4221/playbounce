<template>
    <div>
        <!-- Votre contenu de page ici -->
        <div style="height: 400px;"></div>

        <!-- Footer -->
        <div class="footer" v-show="showFooter">
            <nav>
                <ul>
                    <li class="border_nav blue_nav"><router-link to="/evenements">Événements</router-link></li>
                    <li class="border_nav red_nav"><router-link to="/matchs">Matchs</router-link></li>
                    <li class="border_nav blue_nav"><router-link to="/reservation">Réservation</router-link></li>
                    <li class="border_nav red_nav"><router-link to="/score">Score</router-link></li>
                    <li class="border_nav blue_nav"><router-link to="/gallerie">Galerie</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showFooter = ref(false);

const handleScroll = () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    showFooter.value = isBottom;
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>

.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0; 
    right: 0;  
    bottom: 0; 
    height: 40%;
    background-color: #ffffff; 
}

nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    width: 100%; 
    height: 100%; 
    align-items: center;
}

nav ul li.border_nav.blue_nav a {
    text-decoration: underline solid #3DCBF8 2px; 
    text-underline-offset: 3px;
    border-radius: 10px; 
    padding: 12px 20px; 
}

nav ul li.border_nav.red_nav a {
    text-decoration: underline solid #F83D3D 2px; 
    text-underline-offset: 3px; 
    border-radius: 10px; 
    padding: 12px 20px; 
}

nav ul li.border_nav a:hover,
nav ul li.border_nav a:active {
    background-color: #E3E3E3; 
}

@media (max-width: 768px) {
    .footer {
        flex-direction: column;
        height: auto; 
        padding: 10px ;
    }


    nav ul {
        flex-direction: column;
        align-items: center; 
    }

    nav ul li {
        margin: 10%; 
    }
}


</style>


  