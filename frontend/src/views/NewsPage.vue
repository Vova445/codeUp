<template>
   <main-master-page>
      <section class="news">
         <div class="news__container">
            <h2 class="news__title title title--small">{{ $t('titles.innovationsNews') }}</h2>
            <div class="news__items">
               <template v-for="newsItem in newsList">
                  <a
                     v-if="newsItem.cover_image || newsItem.social_image"
                     class="news__item item-news"
                     target="_blank"
                     :href="newsItem.url"
                     :key="newsItem.id"
                  >
                     <div class="item-news__image">
                        <img :src="newsItem.cover_image || newsItem.social_image" alt="" />
                     </div>

                     <h4 class="item-news__title">{{ newsItem.title }}</h4>
                     <div class="item-news__date">published : {{ formatDate(newsItem.published_at) }}</div>
                  </a>
               </template>
            </div>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainMasterPage from '../masterPages/MainMasterPage.vue'
let newsList = ref([])
function formatDate(dateString) {
   const date = new Date(dateString)
   const year = date.getFullYear()
   const month = String(date.getMonth() + 1).padStart(2, '0')
   const day = String(date.getDate()).padStart(2, '0')
   return `${year}-${month}-${day}`
}
onMounted(() => {
   const apiUrl = 'https://dev.to/api/articles?per_page=10&tag=programming&top=1'
   async function fetchProgrammingNews() {
      try {
         const response = await fetch(apiUrl)
         const newsData = await response.json()
         const topNews = newsData.slice(0, 10)
         console.log('topNews')
         console.log(topNews)
         newsList.value = topNews
      } catch (error) {
         console.error('Помилка при отриманні новин:', error)
      }
   }
   fetchProgrammingNews()
})
</script>

<style lang="scss" scoped>
.news {
   &:not(:last-child) {
      margin-bottom: 70px;
   }
   &__title {
      text-align: center;
      color: #f2f2f2;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 30px;
      padding-bottom: 30px;
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }
   &__items {
      display: grid;
      gap: 30px;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
   }
}
.item-news {
   background-color: #1a1a1a;
   border-radius: 15px;
   transition: all 0.8s ease;
   border: 1px solid transparent;
   &:hover {
      transform: translateY(-7px);
      border: 1px solid $greenColor;
      img {
         transform: scale(1.03);
      }
   }
   display: block;
   padding: 20px;
   display: flex;
   flex-direction: column;
   &__image {
      overflow: hidden;
      border-radius: 15px;
      position: relative;
      padding-bottom: 60%;
      img {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         /* max-width: 100%; */
         object-fit: cover;
         transition: transform 0.3s ease;
      }
      &:not(:last-child) {
         margin-bottom: 15px;
      }
   }
   &__title {
      color: #ffffff;
      line-height: 1.2;
      letter-spacing: 1px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 15px;
      flex: 1 1 auto;
   }
   &__date {
      font-size: 12px;
      color: $greenColor;
   }
}
</style>
