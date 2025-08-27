// Scientific Basis Swiper 초기화
const researchSwiper = new Swiper(".researchSwiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  centeredSlides: false,
  slideToClickedSlide: true,
  pagination: {
    el: ".swiper-pagination",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      // 아무것도 반환하지 않음(직접 조작)
      return "";
    },
  },
  breakpoints: {
    320: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  on: {
    slideChange: function () {
      const bar = document.querySelector(".custom-progressbar-bar");
      const total = this.slides.length - this.params.slidesPerView + 1;
      const percent = 100 / total;
      bar.style.width = percent + "%";
      bar.style.left = percent * this.activeIndex + "%";
    },
  },
});

// 초기 위치 세팅
researchSwiper.emit("slideChange");

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Swiper 인스턴스 생성 이후에 아래 코드 추가
const progressBar = document.querySelector(".custom-progressbar-bar");
const progressBarBg =
  document.querySelector(".custom-progressbar-bg") || progressBar;

let isDragging = false;
let lastSlideIndex = null;

progressBarBg.addEventListener("mousedown", function (e) {
  isDragging = true;
  moveToSlide(e, true);
});

window.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  moveToSlide(e, true);
});

window.addEventListener("mouseup", function () {
  isDragging = false;
  lastSlideIndex = null; // 드래그 종료 시 초기화
});

// 추가: 마우스가 window 밖으로 나가면 드래그 종료
window.addEventListener("mouseleave", function () {
  isDragging = false;
  lastSlideIndex = null;
});

// 슬라이드에서 드래그 방지
const swiperWrapper = document.querySelector(".swiper-wrapper");
if (swiperWrapper) {
  swiperWrapper.addEventListener("mousedown", function (e) {
    // progress bar가 아닌 곳에서의 드래그 방지
    if (
      !e.target.classList.contains("custom-progressbar-bg") &&
      !e.target.classList.contains("custom-progressbar-bar")
    ) {
      e.preventDefault();
      // 드래그 상태로 전환하지 않음
    }
  });
}

function moveToSlide(e, isDrag = false) {
  const rect = progressBarBg.getBoundingClientRect();
  const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width); // 0~width 사이로 제한
  const percent = x / rect.width;

  const total =
    researchSwiper.slides.length - researchSwiper.params.slidesPerView + 1;
  const slideIndex = Math.floor(percent * total);

  // 인덱스가 바뀔 때만 이동
  if (slideIndex !== lastSlideIndex) {
    // 드래그 중에도 transition을 200ms로 고정
    researchSwiper.slideTo(slideIndex, 200);
    lastSlideIndex = slideIndex;
  }
}
