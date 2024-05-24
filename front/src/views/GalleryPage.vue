<template>
  <div class="container">
    <div class="parent">
      <div class="div1">
        <img src="../assets/gallerie1.png"/>
      </div>
      <div class="div2">
        <img src="../assets/gallerie2.png"/>
      </div>
      <div class="div3">
        <img src="../assets/gallerie3.png"/>
      </div>
      <div class="div4">
        <img src="../assets/gallerie4.png"/>
      </div>
      <div class="div5">
        <img src="../assets/gallerie5.png"/>
      </div>
    </div>
    <div class="gallery_text">
      <h2>Gallerie</h2>
    </div>
    <div class="div6">
      <img src="../assets/gallerie6.png"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('../assets/gallerie.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250vh;
}

.gallery_text h2 {
  background-color: #ffffff;
  padding: 5%;
  font-size: 2rem;
  margin: 7%;
  border-radius: 10px;
}

.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 10px;
  padding-top: 5%;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 2 / 1 / 3 / 2; }
.div3 { grid-area: 1 / 2 / 3 / 3; }
.div4 { grid-area: 1 / 3 / 2 / 4; }
.div5 { grid-area: 2 / 3 / 3 / 4; }

/* Styles pour la version mobile */
@media (max-width: 968px) {
  .parent {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .div1, .div2, .div4, .div5 {
    width: 100%;
  }

  .gallery_text,
  .div3,
  .div6 {
    display: none;
  }
}
</style>
