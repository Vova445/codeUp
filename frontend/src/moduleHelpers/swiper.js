import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
// import Swiper and modules styles
import 'swiper/css'
// init Swiper:
export function initSliderCarousal() {
   // Список слайдерів
   // Перевіряємо, чи є слайдер на сторінці
   if (document.querySelector('.courses-carousal__slider')) {
      // Вказуємо склас потрібного слайдера
      // Створюємо слайдер
      new Swiper('.courses-carousal__slider', {
         // Вказуємо склас потрібного слайдера
         // Підключаємо модулі слайдера
         // для конкретного випадку
         modules: [Navigation, Autoplay],
         observer: true,
         observeParents: true,
         slidesPerView: 5,
         spaceBetween: 100,
         autoHeight: true,
         allowTouchMove: false,
         speed: 3000,
         //touchRatio: 0,
         //simulateTouch: false,
         loop: true,
         //preloadImages: false,
         //lazy: true,
         // Ефекти
         //effect: 'fade',
         //fadeEffect: {
         //   crossFade: false,
         //},
         autoplay: {
            delay: 0,
            pauseOnMouseEnter: false,
         },
         // Пагінація
         /*
   		pagination: {
   			el: '.swiper-pagination',
   			clickable: true,
   		},
   		*/
         // Скроллбар
         /*
   		scrollbar: {
   			el: '.swiper-scrollbar',
   			draggable: true,
   		},
   		*/
         // Кнопки "вліво/вправо"
         //navigation: {
         //   prevEl: '.swiper-button-prev',
         //   nextEl: '.swiper-button-next',
         //},
         /*
   		// Брейкпоінти
   		breakpoints: {
   			640: {
   				slidesPerView: 1,
   				spaceBetween: 0,
   				autoHeight: true,
   			},
   			768: {
   				slidesPerView: 2,
   				spaceBetween: 20,
   			},
   			992: {
   				slidesPerView: 3,
   				spaceBetween: 20,
   			},
   			1268: {
   				slidesPerView: 4,
   				spaceBetween: 30,
   			},
   		},
   		*/
         // Події
         on: {},
      })
   }
}
