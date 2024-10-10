<template>
   <div :class="['custom-spoiler', { 'custom-spoiler--big': spoilerBig }]">
      <div
         v-for="(spoilerItem, index) in itemsList"
         :key="spoilerItem.id"
         :class="['custom-spoiler__item', { 'custom-spoiler__item--active': isActive(index) }]"
      >
         <div class="custom-spoiler__header header-custom-spoiler" @click="openSpoiler(index)">
            <div class="header-custom-spoiler__title">{{ $t(spoilerItem.title) }}</div>
            <span class="header-custom-spoiler__arrow"> <font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
         </div>
         <div ref="spoilersItems" class="custom-spoiler__body">
            <p v-for="textItem in spoilerItem.textList" :key="textItem.id">{{ $t(textItem.text) }}</p>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const spoilersItems = ref([])
const props = defineProps({
   itemsList: {
      type: Array,
      required: true,
   },
   spoilerBig: {
      type: Boolean,
      default: false,
   },
})
const prevItemIndx = ref(null)
const activeIndex = ref(null)

const openSpoiler = (index) => {
   const previousIndex = activeIndex.value
   activeIndex.value = activeIndex.value === index ? null : index
   const item = spoilersItems.value[index]
   if (activeIndex.value !== null) {
      item.style.maxHeight = item.scrollHeight + 'px'
   }
   if (prevItemIndx.value !== activeIndex.value || !activeIndex.value) {
      const prevItem = spoilersItems.value[previousIndex]
      if (prevItem) {
         prevItem.style.maxHeight = '0px'
      }
   }
}
const isActive = computed(() => (index) => activeIndex.value === index)
</script>

<style lang="scss" scoped>
.custom-spoiler {
   &__item {
      padding: clamp(0.938rem, 0.678rem + 0.923vw, 1.25rem) 0;
      &:first-child {
         padding-top: 0;
      }
      transition: all 0.5s ease 0s;
      border-bottom: 1px solid #b3b3b3;
   }
   &__body {
      max-height: 0px;
      overflow: hidden;
      transition: all 0.5s ease 0s;
      p {
         color: #d9d9d9;
         letter-spacing: 0.2px;
         line-height: 1.5;
         font-size: clamp(0.875rem, 0.499rem + 0.784vw, 1rem);
      }

      .custom-spoiler--big & p {
         font-size: clamp(1rem, 0.624rem + 0.784vw, 1.2rem);
      }
   }
}
.header-custom-spoiler {
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-radius: 12px;
   // .header-custom-spoiler__title
   &__title {
      font-weight: 500;
      line-height: 1.3;
      font-size: clamp(1rem, 0.624rem + 0.784vw, 1.125rem);
      .custom-spoiler--big & {
         font-size: clamp(1.125rem, -0.129rem + 2.353vw, 1.4rem);
      }
   }
   // .header-custom-spoiler__arrow
   &__arrow {
      font-size: clamp(1rem, 0.812rem + 0.392vw, 1.125rem);
      transition: all 0.5s ease 0s;
      .custom-spoiler__item--active & {
         transform: rotateX(180deg);
      }
      .custom-spoiler--big & {
         font-size: clamp(1.125rem, 0.937rem + 0.392vw, 1.25rem);
      }
   }
   transition: all 0.5s ease 0s;
   .custom-spoiler__item--active & {
      margin-bottom: 20px;
   }
}
</style>
