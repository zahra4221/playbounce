<template>
    <div class="container">
        <img class="first_pic" src="../../assets/homepic.png" alt="Background">          
        <div class="logo-container">
            <img class="logo_pic" src="../../assets/logo_central.png" alt="Central Logo">          
        </div>
        <div>
         <img class="second_pic" src="../../assets/homepic2.png" alt="Additional Image">
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
  top: 85%; /* Align the top of the text box at 50% of the container */
  left: 50%; /* Align the left of the text box at 50% of the container */
  transform: translate(-50%, -50%);
  font-size: 1.2rem; 
  font-weight: 700;
  width: 80%; /* Width of the text box */
  max-width: 600px; /* Maximum width of the text box */
  padding: 35px; /* Padding inside the text box */
  background-color: #ffffff; /* White background */
  border-radius: 20px; /* Rounded corners */
  text-align: center; /* Center align the text */
  z-index: 2; /* Ensure the text box appears above the background image */
}


@media (max-width: 768px) {
    .logo-container {

  height: 15vh;
}     
.second_pic_intro {

  font-size: 0.8rem; 
  padding: 15px; /* Padding inside the text box */


}

}





</style>
