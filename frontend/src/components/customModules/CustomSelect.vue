<template>
   <div class="custom-select" ref="selectWrapper" :class="{ open: isSelected }">
      <div class="custom-select__selected-option" @click="isSelected = !isSelected">
         <span class="custom-select__title">{{ $t(selectedOption.title) }}</span>
         <span class="custom-select__icon"><font-awesome-icon :icon="['fas', 'angle-up']" /></span>
      </div>
      <div class="custom-select__body">
         <div class="custom-select__selects-list">
            <router-link
               v-for="optionItem in getOptionsList"
               :to="{ name: optionItem.routeName }"
               @click="toggleOptionSelect(optionItem)"
               :key="optionItem.id"
               class="custom-select__option"
            >
               {{ $t(optionItem.title) }}
            </router-link>
         </div>
      </div>
   </div>
</template>

<script setup>
import { computed, ref, defineEmits, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
   optionsList: {
      type: Array,
      required: true,
   },
   modelValue: {
      deafault: null,
   },
})
const selectWrapper = ref(null)
const isSelected = ref(false)
function getItem(id) {
   return props.optionsList.find((item) => item.id === id)
}
const getOptionsList = computed(() => {
   return props.optionsList.filter((item) => item.id !== selectedOption.value.id)
})
function toggleOptionSelect(option) {
   selectedOption.value = option
}
const selectedOption = computed({
   get() {
      return getItem(props.modelValue)
   },
   set(option) {
      isSelected.value = false
      emit('update:modelValue', option.id)
   },
})
function toggleSelect(e) {
   if (!selectWrapper.value.contains(e.target)) {
      isSelected.value = false
   }
}
onMounted(() => {
   window.addEventListener('click', toggleSelect)
})
onBeforeUnmount(() => {
   window.removeEventListener('click', toggleSelect)
})
const emit = defineEmits(['update:modelValue'])
</script>
<style lang="scss" scoped>
.custom-select {
   width: 400px;
   position: relative;
   border-radius: 12px;

   @media (max-width: 450px) {
      width: 100%;
   }

   &__selected-option {
      position: relative;
      z-index: 6;
      overflow: hidden;
      background-color: #333333;
      color: #fff;
      transition: all 0.5s ease 0s;
      font-weight: 500;
      padding: 10px 7px;
      display: flex;
      justify-content: space-between;
      border-radius: 8px;
      .open & {
         border-radius: 8px 8px 0 0;
      }
   }

   &__icon {
      transition: transform 0.5s ease;
      transform-origin: center;

      .open & {
         transform: rotateX(180deg);
      }
   }

   &__body {
      pointer-events: none;
      position: absolute;
      transition: all 0.5s ease;
      background-color: #595959;
      color: #fff;
      top: 100%;
      left: 0;
      transform: translate(0, -15%);
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      transform-origin: top;
      opacity: 0;
      z-index: 5;
      border-radius: 0 0 8px 8px;
      .open & {
         pointer-events: all;
         opacity: 1;
         transform: translate(0, 0);
      }
   }

   &__selects-list {
      display: flex;
      flex-direction: column;
   }

   &__option {
      padding: 12px 7px;
      background-color: #595959;
      color: #fff;
      border: none;
      &:first-child {
         .open & {
            border-radius: 8px 8px 0 0;
         }
      }
      &:last-child {
         border-radius: 8px 8px 0 0;
      }
      &:not(:last-child) {
         border-bottom: 1px solid #404040;
      }
   }
}
</style>
