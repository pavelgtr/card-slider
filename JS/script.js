
let swiperCards = new Swiper('.card__content', {
  // observer: true,
  // observeParents: true,
  loop: false,
  spaceBetween: 32,
  slidesPerView: 3, 
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true, 
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    420:{
      slidesPerView: 1
    },
    600:{
      slidesPerView: 2
    },
    968:{
      slidesPerView: 3
    },
  }
});