<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <div class="loading-auth">
     <div class="loading-auth__blur-container"></div>
     <div class="loading-auth__box">
       <div class="loading-auth__lines">
         <span class="loading-auth__line"></span>
         <div class="loading-auth__circle">{{ valueToShow }}</div>
         <span class="loading-auth__line"></span>
       </div>
       <h3 class="loading-auth__title">
         Ваш обліковий запис успішно підтверджено!<br> Ви будете перенаправлені назад через
         <span> {{ valueToShow }} </span> секунд.
       </h3>
     </div>
   </div>
 </template>
 
 
 <script setup>
 import { onMounted, ref } from 'vue'
 import Cookies from 'js-cookie';
 const value = ref(0)
 const valueToShow = ref(3)
 
 onMounted(() => {
    const totalTime = 3000
    const intervalDuration = 50
    let elapsed = 0
 
    const interval = setInterval(() => {
       elapsed += intervalDuration
       value.value = (elapsed / totalTime) * 100
 
       if (elapsed % 1000 === 0) {
          valueToShow.value -= 1
       }
 
       if (valueToShow.value === -1) {
          valueToShow.value = 3
          value.value = 0
          elapsed = 0
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get('token');
          console.log('Token from URL:', token);
          if (token) {
             Cookies.set('authToken', token);
             console.log('Token saved in cookies:', token);
             Cookies.remove('tempAuthToken');
          }
 
          window.location.href = 'https://code-up-omega.vercel.app/user'
          clearInterval(interval)
       }
    }, intervalDuration)
 })
 </script>
<style lang="scss" scoped>
.loading-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 2.5rem 0.9375rem;
  position: relative;
  overflow: hidden;
  &__blur-container {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 63rem;
    height: 2.5rem;
    transform: translate(-50%, -50%);
    background: $secondGreenColor;
    filter: blur(150px);
    z-index: -1;
  }

  &__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  &__lines {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__line {
    display: block;
    width: 15rem;
    height: 0.3rem;
    background-color: $secondGreenColor;
    box-shadow: 0 0 9px $secondGreenColor;
    position: relative;
  }

  &__circle {
    width: 21.25rem;
    height: 21.25rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    color: $secondGreenColor;
    text-shadow: 0 0 9px $secondGreenColor;
    background-color: #000;
    margin: 0 2.5rem;
    position: relative;
    animation: circleGlow 2s ease-in-out infinite alternate;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      box-shadow: 
        0 0 15px 5px rgba(0, 181, 60, 0.5), 
        0 0 25px 10px rgba(0, 181, 60, 0.3),
        0 0 35px 15px rgba(0, 181, 60, 0.1);
    }
  }

  &__title {
    margin-top: 3.75rem;
    line-height: 1.3;
    color: #ffffff;
    font-weight: 400;
    font-size: clamp(0.875rem, -0.157rem + 2.153vw, 1.563rem);
    
    span {
      padding: 0 5px;
      font-weight: 600;
      color: $secondGreenColor;
    }
  }
}

@keyframes circleGlow {
  0% {
    box-shadow: 0 0 20px rgba(0, 181, 60, 0.6), inset 0 0 10px rgba(0, 181, 60, 0.4);
  }
  100% {
    box-shadow: 0 0 30px rgba(0, 181, 60, 1), inset 0 0 20px rgba(0, 181, 60, 0.8);
  }
}

</style>
