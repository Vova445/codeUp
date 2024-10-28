<template>
   <section class="statistic">
      <h3 class="statistic__title title">{{ $t('titles.statisticTitle') }}</h3>
      <div class="statistic__container">
         <div class="statistic__container__contentOne">
            <h4 class="statistic__container__numberOfCourses">8000+</h4> <!-- Потім додам у базу даних ключ, де після кожного купленого курсу буде робитися лічильник +1, і значення тут змінемо на лічильник з бази даних -->
            <p class="statistic__container__descriptionOfCourses">{{ $t('description.statisticPurchased') }}</p>
         </div>
         <hr />
         <div class="statistic__container__contentTwo">
            <p class="statistic__container__descriptionOfCourses">{{ $t('description.statisticPassed') }}</p>
            <h4 class="statistic__container__numberOfCourses">10000</h4> <!-- Потім додам у базу даних ключ, де після кожного купленого курсу буде робитися лічильник +1, і значення тут змінемо на лічильник з бази даних -->
         </div>
      </div>
   </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.statistic {
   &__title {
      text-align: center;
      margin-bottom: 140px;
      margin-top: 300px;
   }

   &__container {
      margin-bottom: 300px;

      &__contentOne,
      &__contentTwo {
         display: grid;
         grid-template-columns: clamp(150px, 40%, 500px) auto; 
         gap: clamp(2rem, 1.5rem + 2vw, 6rem);
         align-items: center;
      }

      &__numberOfCourses {
         color: $greenColor;
         font-size: clamp(2.5rem, 0.204rem + 11.482vw, 9.375rem);
         text-shadow: 0 0 9px $greenColor;
         text-align: left;
      }
      
      &__descriptionOfCourses {
         font-size: clamp(1rem, 0.499rem + 2.505vw, 2.5rem);
         color: $whiteColor;
         text-align: right;
      }
      
      hr {
         margin-top: 50px;
         margin-bottom: 50px;
         border: 1px solid rgba(2, 254, 86, 0.5);
      }
   }
}
</style>
