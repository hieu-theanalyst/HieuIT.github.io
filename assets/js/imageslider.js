document.querySelectorAll('.custom-slider').forEach((slider, index) => {
    const wrapper = slider.querySelector('.slider-wrapper');
    const imagesContainer = wrapper.querySelector('.slider-images');
    const images = wrapper.querySelectorAll('.slider-image');
    const prev = wrapper.querySelector('.prev');
    const next = wrapper.querySelector('.next');
    let currentIndex = 0;

    function updateSlider() {
      imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function autoSlide() {
      return setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
      }, 10000);
    }

    let slideInterval = autoSlide();

    function resetAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = autoSlide();
    }

    prev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
      resetAutoSlide();
    });

    next.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
      resetAutoSlide();
    });

    // Touch support
    let startX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    wrapper.addEventListener('touchend', (e) => {
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
        resetAutoSlide();
      } else if (startX - endX > 50) {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
        resetAutoSlide();
      }
    });

    updateSlider(); // init
  });


document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".image-slider-wrapper");

  sliders.forEach((wrapper) => {
    const slider = wrapper.querySelector(".image-slider");
    const images = slider.querySelectorAll("img");
    const prevBtn = wrapper.querySelector(".img-prev");
    const nextBtn = wrapper.querySelector(".img-next");
    const dotsContainer = wrapper.querySelector(".img-dots");
    let index = 0;

    // Generate dots
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateSlider() {
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) =>
        dot.classList.toggle("active", i === index)
      );
    }

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateSlider();
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateSlider();
    });

    updateSlider();
  });
});
