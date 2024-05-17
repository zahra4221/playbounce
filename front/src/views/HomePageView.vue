<template>
    <div class="background">
      
      <IntroHomePage /> 
      <FootHomePage/>     
      <BasketHomePage/>


    </div>
  </template>
  <script setup>
  
  import IntroHomePage from '../components/HomePage/IntroHomePage.vue'
  import FootHomePage from '../components/HomePage/FootHomePage.vue'
 import  BasketHomePage from '../components/HomePage/BasketHomePage.vue'
 </script>
  
  <style scoped>

  .background{
    height:auto
  }
 
  </style>
  