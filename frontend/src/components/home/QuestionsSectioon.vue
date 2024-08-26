<template>
   <section class="faq">
      <div class="faq__container">
         <div class="faq__list">
            <div 
               v-for="(questionItem, index) in questionsList" 
               :key="questionItem.id" 
               :class="['faq__item', { 'faq__item--active': isActive(index) }]" 
               @click="toggleFaq(index)"
            >
               <div class="faq__header-item">
                  <div class="faq__title">{{ $t(questionItem.question) }}</div>
                  <div class="faq__arrow">
                     <font-awesome-icon 
                        :icon="['fas',  'chevron-down']" 
                     />
                  </div>
               </div>
               <div class="faq__text">
                  {{ $t(questionItem.answer) }}
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

const props = defineProps({
   questionsList: {
      type: Array,
      required: true,
   },
})

const activeIndex = ref(null)
const toggleFaq = (index) => {
   activeIndex.value = activeIndex.value === index ? null : index
}
//const isActive = (index) => activeIndex.value === index

const isActive = computed(() => (index) => activeIndex.value === index)


</script>

<style lang="scss" scoped>
.faq {
   margin-bottom: 200px;

   &__item {
      background-color: #2b2b2b;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: background-color 0.3s, margin-bottom 0.5s ease;
      &:hover {
         background-color: #3b3b3b;
      }
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }

   &__header-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: margin-bottom 0.5s ease;
   }

   &__title {
      color: #f0f0f0;
      font-size: 18px;
      font-weight: bold;
   }

   &__arrow {
      font-size: 20px;
      color: #f0f0f0;
      transition: transform 0.5s ease;
   }

   &__text {
      color: #ccc;
      font-size: 16px;
      overflow: hidden;
      max-height: 0;
      transition: all 0.5s ease;
   }

   &__item--active {
      .faq__header-item {
         //margin-bottom: 20px;
      }
      
      .faq__text {
         padding: 20px 0;
         //max-height: 100px;
         opacity: 1;
      }

      .faq__arrow {
         transform: rotate(180deg);
      }
   }
}
</style>