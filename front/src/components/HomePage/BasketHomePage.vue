<template>
    <div class="container">
        <img class="foot_pic" src="../../assets/basket1.png" alt="Background">
        <div class="pic_contain">
            <div class="foot_text">
                <h2>Basketball</h2>
                <p>Chaque instant est une opportunité de briller, de repousser vos limites et de célébrer la passion pour le ballon rond.</p>
            </div>
            <img class="foot_pic_2" src="../../assets/basket2.png">
        </div>  
                
    </div>
    <img class="lastpic" src="../../assets/home_lastpic.png">

</template>

<script setup>
</script>

<style scoped>
.container {
    position: relative; 
    width: 100%; 
    margin-top: 15%;
}
.foot_pic {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}

.lastpic{
    margin-top: 32%;
    width: 100%;
}

.foot_text {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding: 5%;
    background-color:#EDEDED;
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
