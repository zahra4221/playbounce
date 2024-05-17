<template>
    <div class="container"> 
       <div class="login">
           <img class="login_fond" src="../assets/registration.png"/>
           <form class="form-container">
                <div class="form-group">
                    <label for="firstName">Prénom :</label>
                    <input class="input" type="text" id="firstName" name="firstName" required placeholder="Entrez votre prénom">
                </div>
                <div class="form-group">
                    <label for="lastName">Nom :</label>
                    <input class="input" type="text" id="lastName" name="lastName" required placeholder="Entrez votre nom">
                </div>
                <div class="form-group">
                    <label for="birthDate">Date de naissance :</label>
                    <input class="input" type="date" id="birthDate" name="birthDate" required>
                </div>
                <div class="form-group">
                    <label for="email">Email :</label>
                    <input class="input" type="email" id="email" name="email" required placeholder="Entrez votre email">
                </div>
                <div class="form-group">
                    <label for="password">Choisissez un mot de passe :</label>
                    <input class="input" type="password" id="password" name="password" required placeholder="Entrez votre mot de passe">
                </div>
                <button type="submit">Valider votre inscription</button>
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
     height: 100vh;
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
       top: 57%;  /* Center vertically */
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
   
   .input {
       width: 60%;
       padding: 5px;
       border: 1px solid #ccc;
       border-radius: 5px;
   }
   
   button {
       width: 40%;
       padding: 10px;
       border: none;
       border-radius: 5px;
       background-color:rgb(255, 0, 0);
       color: white;
       cursor: pointer;
       font-size: 16px;
   }
   
   button:hover {
       background-color: #0056b3;
   }
   </style>
   