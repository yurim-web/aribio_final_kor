document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const txtBoxes = document.querySelectorAll(".txt_box");
  let animationTimeline = null;

  // 모바일 여부 판별 함수
  function isMobileDevice() {
    return window.innerWidth <= 767;
  }

  // 기존 애니메이션 제거
  function killAnimation() {
    if (animationTimeline) {
      animationTimeline.kill();
      animationTimeline = null;
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // 애니메이션 초기화 함수
  function initAnimation() {
    if (isMobileDevice()) {
      killAnimation();
      return;
    }

    killAnimation(); // 혹시 있을 기존 타임라인 제거

    animationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".banner_section",
        start: "top",
        end: "150%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    txtBoxes.forEach((box, index) => {
      const fillText = box.querySelector(".text-fill");
      animationTimeline.to(
        fillText,
        {
          backgroundSize: "100% 100%",
          duration: 1.7,
          ease: "none",
        },
        index
      );
    });
  }

  // 리사이즈 디바운싱 처리
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initAnimation();
    }, 300);
  });

  // 첫 실행
  initAnimation();

  // 카드 스크롤 애니메이션
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".clinical_results",
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
    },
  });

  // 첫 번째 카드는 고정
  gsap.set(".section_box:first-child", {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  });

  // 두 번째 카드 애니메이션
  timeline
    .fromTo(
      ".section_box:nth-child(2)",
      { y: 0, zIndex: 2 },
      { y: -772, duration: 0.3, ease: "power1.inOut" }
    )

    // 세 번째 카드 애니메이션
    .fromTo(
      ".section_box:last-child",
      { y: 0, zIndex: 3 },
      { y: -772, duration: 0.3, ease: "power1.inOut" }
    );

  // // 모바일 카드 스크롤 애니메이션
  // const motimeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".clinical_results_mobile",
  //     start: "top top",
  //     end: "+=300%",
  //     pin: true,
  //     pinSpacing: true,
  //     scrub: true,
  //   },
  // });

  // // 첫 번째 카드는 고정
  // gsap.set(".section_box_mo:first-child", {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   zIndex: 1,
  // });
  // motimeline
  //   // 두 번째 카드 올라옴 (0% ~ 50%)
  //   .fromTo(
  //     ".mo_back_2",
  //     { y: "1340px", zIndex: 2 },
  //     {
  //       y: "0vh",
  //       ease: "power2.inOut",
  //     },
  //     0 // 타임라인 시작점
  //   )
  //   // 세 번째 카드 올라옴 (50% ~ 100%)
  //   .fromTo(
  //     ".mo_back_3",
  //     { y: "100vh", zIndex: 3 },
  //     {
  //       y: "0vh",
  //       ease: "power2.inOut",
  //     },
  //     0.5 // 타임라인 중간부터
  //   );
});

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  direction: "horizontal",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1.2,
      spaceBetween: 40,
    },
  },
});

// 앱 다운로드 모바일 스와이퍼 초기화
const appDownloadSwiperElement = document.querySelector(".appDownloadSwiper");

if (appDownloadSwiperElement && typeof Swiper !== "undefined") {
  const appDownloadSwiper = new Swiper(".appDownloadSwiper", {
    slidesPerView: 1.2, // 한 화면에 보이는 슬라이드 수
    spaceBetween: 35, // 슬라이드 사이 간격
    centeredSlides: true, // 가운데 정렬
    loop: false, // ✅ 무한 루프 끔
    initialSlide: 0, // 첫 번째 슬라이드부터 시작
    pagination: {
      el: ".appDownloadSwiper .swiper-pagination", // 페이지네이션 위치
      clickable: true, // 페이지네이션 클릭 가능
    },
    effect: "coverflow", // 커버플로우 효과
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      init: function () {
        // 초기화 시 첫 번째 슬라이드로 이동
        this.slideTo(0, 0, false);
      },
      slideChange: function () {
        // 슬라이드 변경 시 페이지네이션 업데이트
        const realIndex = this.realIndex;
        const paginationBullets = this.pagination.bullets;
        if (paginationBullets) {
          paginationBullets.forEach((bullet, index) => {
            bullet.classList.toggle(
              "swiper-pagination-bullet-active",
              index === realIndex
            );
          });
        }
      },
    },
  });
} else {
  console.warn(
    "Swiper 라이브러리가 로드되지 않았거나 .appDownloadSwiper 요소를 찾을 수 없습니다."
  );
}


// 모바일 임상결과 스와이퍼 초기화
// 테블릿용 임상결과 슬라이더
const clinicalSwiperTab = new Swiper(".clinicalSwiperTab", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".clinicalSwiperTab .swiper-pagination",
    clickable: true,
  },
  effect: "slide",
  speed: 600,
  grabCursor: true,
  keyboard: {
    enabled: false,
  },
  mousewheel: {
    enabled: false,
  },
});

// 모바일용 임상결과 슬라이더
const clinicalSwiperMobile = new Swiper(".clinicalSwiperMobile", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".clinicalSwiperMobile .swiper-pagination",
    clickable: true,
  },
  effect: "slide",
  speed: 600,
  grabCursor: true,
  keyboard: {
    enabled: false,
  },
  mousewheel: {
    enabled: false,
  },
});

// 터치 이벤트 지원
document.addEventListener("DOMContentLoaded", function () {
  // 터치 스와이프 감지
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    handleSwipe();
  });

  function handleSwipe() {
    const diffX = startX - endX;
    const diffY = startY - endY;

    // 수평 스와이프가 수직 스와이프보다 클 때만 처리
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50) {
        // 왼쪽으로 스와이프 - 다음 슬라이드
        if (window.innerWidth > 767) {
          clinicalSwiperTab.slideNext();
        } else {
          clinicalSwiperMobile.slideNext();
        }
      } else if (diffX < -50) {
        // 오른쪽으로 스와이프 - 이전 슬라이드
        if (window.innerWidth > 767) {
          clinicalSwiperTab.slidePrev();
        } else {
          clinicalSwiperMobile.slidePrev();
        }
      }
    }
  }
});
