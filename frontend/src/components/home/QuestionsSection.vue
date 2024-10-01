<template>
   <section class="faq">
      <div class="faq__container">
         <h2 class="faq__title title">FAQ</h2>
         <div class="faq__list">
            <custom-spoiler :items-list="data.questionsList" :spoiler-big="true" />
         </div>
         <slot></slot>
      </div>
   </section>
</template>

<script setup>
import CustomSpoiler from '../../components/customModules/CustomSpoiler.vue'
import data from '../../data/mainSection/index'
const props = defineProps({
   questionsList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.faq {
   &__title {
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, -0.324rem + 5.882vw, 4.375rem);
      }
   }
   &__list {
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, 0.155rem + 2.935vw, 3.5rem);
      }
   }
}
</style>
