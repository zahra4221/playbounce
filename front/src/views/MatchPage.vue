<template>
  <div class="container"> 
    <div class="basket">
      <div class="titre_basket">
        <h2>BASKETBALL</h2>
      </div>
      <div class="match">
        <img src="../assets/logo_match1.png"/>
        <h3>Thunder</h3>
        <p>VS</p>
        <img src="../assets/logo_match2.png"/>

        <h3>New York</h3>
        <button class="button_basket">Réserver sa place</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/match.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 300vh; 
}

.basket {
  padding-top: 25%;
}

.titre_basket h2 { 
  background-color: white;
  display: inline-block;
  padding: 10px 35px;
  border-radius: 5px;
}

.match {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10%; 
  padding: 2%;
  color: white;
  background-color: rgba(0, 0, 0, 0.62); /* Black with 62% opacity */
}

.button_basket{
  border-radius: 22px;
  padding: 2%;
  background-color:  rgba(109, 185, 255, 0.5); 
  color: white;
  font-size: 1rem;
}
</style>
