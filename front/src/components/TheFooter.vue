<template>
    <div class="the_footer">
      <div class="content-wrap"></div>
      <footer class="footer">
        <nav>
          <ul>
            <li class="border_nav general"><router-link to="/contact">Contact</router-link></li>
            <li class="border_nav match_score"><router-link to="/tarif">Tarif</router-link></li>
            <li class="border_nav general"><router-link to="/blog">Blog</router-link></li>
            <li class="border_nav match_score"><router-link to="/acces">Accès</router-link></li>
            <li class="border_nav general"><router-link to="/conditiongenerale">CGV</router-link></li>
          </ul>
        </nav>
        <div class="footer_bottom_line">
        <div class="logo_reseau">
            <img src="../assets/facebook.png"/>
            <img src="../assets/instagram.png"/>
            <img src="../assets/tiktok.png" class="tiktok"/>

        </div>
        </div>

      </footer>
    </div>
  </template>
  <style scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 6%;
    background-color: #E3E3E3;
    left: 0;  
    right: 0; 
    bottom: 0; 
    height: 60px; 
    background-color: #ffffff; 
  }
  
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin-bottom: 25%;
    justify-content: center;
    width: 100%;
    height: 100%; 
    align-items: center;
  }
  
  nav ul li.border_nav.general a {
    text-decoration: underline solid #3DCBF8 2px;
    text-underline-offset: 3px; 
    border-radius: 10px; 
    padding: 12px 20px; 
  }
  
  nav ul li.border_nav.match_score a {
    text-decoration: underline solid #F83D3D 2px; 
    text-underline-offset: 3px; 
    border-radius: 10px; 
    padding: 12px 20px; 
  }
  
  nav ul li.border_nav a:hover,
  nav ul li.border_nav a:active {
    text-decoration: underline solid #000000 2px; 
  }
  
  @media (max-width: 768px) {
    .footer {
        flex-direction: column;
        height: auto; 
        padding: 10px 0; 
    }
  
    nav ul {
        flex-direction: column;
        align-items: center;
    }
  
    nav ul li {
        margin: 5%; 
    }
    .logo_reseau{
    display: flex;
    justify-content: space-around;
    margin-left: 40%;
    margin-right: 40%;
    margin-top: 5%;
    margin-bottom: 25%;
}
  }




.footer_bottom_line {
  width: 80%;
  height: 2px;
  background-color: #000000;
  position: absolute;
  bottom: 0;
}

.logo_reseau{
    display: flex;
    justify-content: space-around;
    margin-left: 40%;
    margin-right: 40%;
    margin-top: 2%;
    margin-bottom: 5%;
}
.tiktok{
    width:50px
}
  </style>