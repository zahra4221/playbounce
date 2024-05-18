
<script setup>
import { ref, provide } from 'vue';
import Header from './components/TheHeader.vue';

const isLoggedIn = ref(!!localStorage.getItem('token'));
const userRole = ref(localStorage.getItem('role'));

provide('isLoggedIn', isLoggedIn);
provide('userRole', userRole);
</script>
<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <TheFooter></TheFooter>
  </div>
</template>

<style scoped>
@import './assets/base.css';
</style>
