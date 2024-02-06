
let swiperCards = new Swiper('.card__content', {
  loop: false,
  slidesPerView: 3, 
  grabCursor: true,
  // autoHeight: true,
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
    320:{
      slidesPerView: 1,
      spaceBetween: 20
    },
    820:{
      slidesPerView: 2,
      spaceBetween: 30
    },
    1093:{
      slidesPerView: 3,
      spaceBetween: 40
    },
  }
});

// button for registration 
document.getElementById('submitArrow').addEventListener('click', function() {
  window.location.href = 'https://doncella.com.do/#contacto';
});