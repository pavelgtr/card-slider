// Initialize Swiper for card content
let swiperCards = new Swiper(".card__content", {
  loop: false,
  slidesPerView: 3,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    820: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1093: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});

// Button for registration redirection
document.getElementById("submitArrow").addEventListener("click", function() {
  window.location.href = "https://doncella.com.do/#contacto";
  alert("clicked"); // Alert when the button is clicked
});

// Countdown Timer
function updateCountdown() {
  const endDate = new Date("2024-04-01T00:00:00"); // Ensure to include time
  const now = new Date();
  const timeRemaining = endDate.getTime() - now.getTime();

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update the countdown display
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// Initial countdown update
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);
