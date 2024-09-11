<template>
   <section class="faq">
      <div class="faq__container">
         <h2 class="faq__title title">FAQ</h2>
         <div class="faq__list">
            <div
               v-for="(questionItem, index) in questionsList"
               :key="questionItem.id"
               :class="['faq__item', { 'faq__item--active': isActive(index) }]"
               @click="toggleFaq(index)"
            >
               <div class="faq__header-item">
                  <div class="faq__sub-title subtitile">{{ $t(questionItem.question) }}</div>
                  <div class="faq__arrow">
                     <font-awesome-icon :icon="['fas', 'chevron-down']" />
                  </div>
               </div>
               <div class="faq__text">
                  <p>{{ $t(questionItem.answer) }}</p>
               </div>
            </div>
         </div>
         <slot></slot>
      </div>
   </section>
</template>

<script setup>
import { ref, computed } from 'vue'

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
const isActive = computed(() => (index) => activeIndex.value === index)
</script>

<style lang="scss" scoped>
.faq {
   margin-bottom: 200px;
   &__title {
      font-size: clamp(1.75rem, 0.624rem + 2.348vw, 2rem);
      &:not(:last-child) {
         margin-bottom: 30px;
      }
   }
   &__list {
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }
   &__item {
      background-color: #2b2b2b;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition:
         background-color 0.3s,
         margin-bottom 0.5s ease;
      @media (any-hover: hover) {
         &:hover {
            background-color: #3b3b3b;
         }
      }
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }

   &__header-item {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
   }
   &__sub-title {
      color: #f0f0f0;
      @media (max-width: 500px) {
         font-size: 16px;
      }
   }
   &__arrow {
      font-size: clamp(1rem, 0.625rem + 0.783vw, 1.25rem);
      color: #f0f0f0;
      transition: transform 0.5s ease;
   }
   &__text {
      color: #ccc;
      font-size: 16px;
      overflow: hidden;
      max-height: 0;
      padding: 0;
      transition: all 0.3s ease;
      line-height: 1.25;
   }

   &__item--active {
      .faq__text {
         padding: 20px 0;
         max-height: 200px;
      }
      .faq__arrow {
         transform: rotate(180deg);
      }
   }
}
</style>
