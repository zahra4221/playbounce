<template>
  <div class="container">
      <img class="first_pic" src="../assets/homepic.png" alt="Background">          
      <div class="logo-container">
          <img class="logo_pic" src="../assets/logo_central.png" alt="Central Logo">          
      </div>
      <div>
       <img class="second_pic" src="../assets/homepic2.png" alt="Additional Image">
       <p class="second_pic_intro">Play Bounce est un concept novateur de complexe sportif, qui se spécialise dans le basketball et le football, tout en intégrant des éléments de divertissement et de culture américaine.</p>    
  </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
position: relative; 
width: 100%; 
}





  .first_pic {
width: 100%;
}

.logo-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
width: 100%;
height: 30vh; 
}

.logo_pic {
width: 70%; 
max-width: 600px;
z-index: 1;
}
.second_pic {
width: 100%; 

}

.second_pic_intro {
position: absolute;
top: 85%;
left: 50%; 
transform: translate(-50%, -50%);
font-size: 1.2rem; 
font-weight: 700;
width: 80%;
max-width: 600px; 
padding: 35px; 
background-color: #ffffff;
border-radius: 20px; 
text-align: center; 
z-index: 2; 
}


@media (max-width: 768px) {
  .logo-container {

height: 15vh;
}     

.container2 {
position: relative; 
width: 100%; 
}

.second_pic_intro {
position: absolute;
top: 82%; 
transform: translate(-50%, -50%);
font-size: 0.7rem; 
font-weight: 600;
width: 50%; 
max-width: 300px; 
padding: 15px; 
background-color: #ffffff; 
border-radius: 20px; 
text-align: center; 
z-index: 2;
}


}



.pic_contain {
    position: relative;
    display: flex;
    flex-direction: row;
}




</style>