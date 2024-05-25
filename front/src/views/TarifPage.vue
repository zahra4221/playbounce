<template>
    <div class="pricing-page">
      <h1 class="title">Nos Tarifs</h1>
      <p class="description">
        Découvrez nos différentes formules adaptées à tous les âges et besoins pour les réservations de terrain. Que ce soit pour une visite ponctuelle ou pour une inscription annuelle, nous avons l'offre qui vous convient.
      </p>
      
      <div class="pricing-cards">
        <div v-for="tier in pricingTiers" :key="tier.category" class="pricing-card">
          <div class="card-header">{{ tier.category }}</div>
          <div class="card-body">
            <p class="price price-entry"><span>À l'entrée:</span> {{ tier.entry }} / semaine</p>
            <p class="price price-monthly"><span>Mensuel:</span> {{ tier.monthly }}</p>
            <p class="price price-annual"><span>Annuel:</span> {{ tier.annual }}</p>
            <p class="benefits">{{ tier.benefits }}</p>
          </div>
        </div>
      </div>
      <p>Attention: les matchs officiels sont toujours au prix de 12€ par personne.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const pricingTiers = ref([
    { category: "Enfant (-16 ans)", entry: "8,50€", monthly: "33€", annual: "396€", benefits: "Accès illimité aux terrains pour enfants, avec des séances encadrées le weekend." },
    { category: "16 - 25 ans", entry: "10€", monthly: "40€", annual: "472,20€", benefits: "Tarifs réduits pour les étudiants et jeunes adultes, avec des événements sportifs exclusifs." },
    { category: "+25 ans", entry: "11€", monthly: "44€", annual: "528€", benefits: "Accès complet à toutes les installations et cours proposés, idéal pour les adultes actifs." },
    { category: "Groupe (5 personnes)", entry: "9,35€", monthly: "37,40€", annual: "448,80€", benefits: "Parfait pour les familles ou les groupes d'amis, profitez de tarifs groupés avantageux." }
  ]);
  </script>
  
  <style scoped>
.pricing-page {
  position: relative;
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #fff;
}

.pricing-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../assets/tarif.webp') no-repeat center center/cover;
  opacity: 0.8; 
  z-index: -1;
}


.price-entry {
  color: #F83D3D; /* Rouge pour À l'entrée */
}

.price-monthly {
  color: #3DCBF8; /* Bleu pour Mensuel */
}

.price-annual {
  color: #9FCD3B; /* Vert pour Annuel */
}

  
  .title {
    font-size: 3rem;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
    margin-bottom: 1rem;
  }
  
  .description {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    opacity: 0.9;
  }
  
  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .pricing-card {
    background: rgba(0, 0, 0, 0.8); /* More contrast for readability */
    border-radius: 15px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }
  
  .pricing-card:hover {
    transform: scale(1.05);
  }
  
  .card-header {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  
  .card-body {
    font-size: 1.2rem;
  }
  
  .price {
    margin: 0.5rem 0;
  }
  
  .price span, .benefits {
    display: block;
    font-weight: bold;
    margin-top: 0.5rem;
  }
  
  .benefits {
    font-size: 1rem;
    color: #ccc;
    opacity: 0.9;
  }
  </style>
  