//document.addEventListener('DOMContentLoaded', () => {
//   const sections = document.querySelectorAll('[data-watch]')

//   const observer = new IntersectionObserver(
//      (entries) => {
//         entries.forEach((entry) => {
//            if (entry.intersectionRatio >= 0.1) {
//               entry.target.classList.add('watched')
//               observer.unobserve(entry.target)
//            }
//         })
//      },
//      { threshold: 0.1 },
//   )

//   sections.forEach((section) => {
//      if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
//         section.classList.add('watched')
//      } else {
//         observer.observe(section)
//      }
//   })
//})
