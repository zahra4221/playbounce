<template>
    <div class="container"> 
       <div class="login">
           <img class="login_fond" src="../assets/fond_login.png"/>
           <form class="form-container">
               <div class="form-group">
                   <label for="email">Email :</label>
                   <input type="email" id="email" name="email" required placeholder="Entrez votre email">
               </div>
               <div class="form-group">
                   <label for="password">Mot de passe :</label>
                   <input type="password" id="password" name="password" required placeholder="Entrez votre mot de passe">
               </div>
               <button type="submit">Connexion</button>
           </form>
       </div>
    </div>
   </template>
   <style scoped>
   .container {
     text-align: center;
     background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/login.png');
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
     height: 200vh;
   }
   
   .login {
       position: relative;
       display: inline-block; /* Adjust this as needed to control the form's positioning */
   }
   
   .login_fond {
       display: block;
       max-width: 100%;
       height: auto;
       padding-top: 20%;
   }
   
   .form-container {
       position: absolute;
       top: 60%;  /* Center vertically */
       left: 50%; /* Center horizontally */
       transform: translate(-50%, -50%);
       width: 80%; /* Adjust based on your image's aspect ratio */
   }
   
   .form-group {
       margin-bottom: 20px;
   }
   
   label {
       display: block;
       margin-bottom: 5px;
   }
   
   input[type="email"], input[type="password"] {
       width: 100%;
       padding: 10px;
       border: 1px solid #ccc;
       border-radius: 5px;
   }
   
   button {
       width: 100%;
       padding: 10px;
       border: none;
       border-radius: 5px;
       background-color: #000000;
       color: white;
       cursor: pointer;
       font-size: 16px;
   }
   
   button:hover {
       background-color: #0400ff;
   }
   </style>
   