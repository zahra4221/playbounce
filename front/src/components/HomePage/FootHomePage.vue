<template>
    <div class="container">
        <img class="foot_pic" src="../../assets/foot1.png" alt="Background">
        <div class="pic_contain">
            <div class="foot_text">
                <h2>FootBall</h2>
                <p>Sur ce terrain, le plaisir du sport se mêle à la compétition amicale, offrant une expérience immersive et inoubliable à chaque joueur</p>
            </div>
            <img class="foot_pic_2" src="../../assets/foot2.png">
        </div>  
                
    </div>
</template>

<script setup>
</script>

<style scoped>
.container {
    position: relative; 
    width: 100%; 
    margin-top: 8%;
}
.foot_pic {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}

.foot_text {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 5%;
    background-color: white;
    border-radius: 2%;
    margin-top: 5%;
    width:50%;
    margin-right: 5%;

    margin-left: 5%;


}

.foot_text h2{
    font-size: 40px;
    font-weight: 800;
}

.foot_text p{
    font-size: 18px;
    font-weight: 600;
    text-align: center;

}

.foot_pic_2 {
    z-index: 1;
    width:45%;
    margin-top: 10%;
}

.pic_contain {
    position: relative;
    display: flex;
    flex-direction: row;
}


@media (max-width: 768px) {
 

.foot_text p{
    font-size: 12px;
 
}
.foot_text h2{
    font-size: 22px;
 
}



}

</style>
