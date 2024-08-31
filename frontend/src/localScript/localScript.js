function updateDeviceClass() {
   const htmlElement = document.documentElement

   if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      htmlElement.classList.add('touch')
      htmlElement.classList.remove('cursor')
   } else {
      htmlElement.classList.add('cursor')
      htmlElement.classList.remove('touch')
   }
}

updateDeviceClass()

window.addEventListener('pointerdown', updateDeviceClass)
window.addEventListener('touchstart', updateDeviceClass)
