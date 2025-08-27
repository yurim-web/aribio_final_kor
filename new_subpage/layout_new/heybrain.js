// 1. 브라우저 기본 해시 점프 방지: hash 제거 → 스크롤 → hash 복원
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;

  if (hash) {
    // 일단 해시를 임시로 제거 (점프 방지)
    const scrollTarget = hash;
    history.replaceState(null, '', window.location.pathname);

    // 맨 위로 부드럽게 스크롤
    window.scrollTo(0, 0);

    // 짧은 지연 후 다시 hash 복원 + 필요시 수동 스크롤 (선택)
    setTimeout(() => {
      // 부드러운 스크롤 애니메이션
      const startY = window.scrollY;
      const distance = 0 - startY;
      const duration = 800;
      let startTime = null;

      function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startY + distance * ease);
        if (progress < 1) requestAnimationFrame(animateScroll);
      }

      function easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      requestAnimationFrame(animateScroll);

      // 해시 복원 (주소 다시 표시)
      history.replaceState(null, '', window.location.pathname + scrollTarget);
    }, 50);
  }
});
