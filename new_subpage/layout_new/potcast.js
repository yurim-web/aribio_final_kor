window.addEventListener(
  "wheel",
  function (e) {
    e.stopPropagation(); // 상위로 전달되는 이벤트 차단
  },
  { passive: false }
);

document.body.addEventListener(
  "wheel",
  function (e) {
    e.stopPropagation(); // 이것도 같이 해줌
  },
  { passive: false }
);

// 팟캐스트 영역 js 코드
document.addEventListener("DOMContentLoaded", function () {
  const podcastItems = document.querySelectorAll(".podcast_item_box");
  const moreBtn = document.getElementById("more_btn");
  const INITIAL_VISIBLE = 6;
  const ITEMS_PER_PAGE = 6;
  let currentVisible = INITIAL_VISIBLE;

  function updatePodcastItems() {
    podcastItems.forEach((item, idx) => {
      item.style.display = idx < currentVisible ? "flex" : "none";
    });
    // 7개 이상일 때만 더보기 버튼 노출
    if (
      podcastItems.length > INITIAL_VISIBLE &&
      podcastItems.length > currentVisible
    ) {
      moreBtn.style.display = "flex";
    } else {
      moreBtn.style.display = "none";
    }
  }

  // 초기 상태: 6개까지 보이기
  updatePodcastItems();

  // 더보기 버튼 클릭 시 6개씩 추가 노출
  moreBtn.addEventListener("click", function () {
    currentVisible += ITEMS_PER_PAGE;
    updatePodcastItems();
  });

  // ========================
  // 기존 팟캐스트 오디오 코드
  // ========================
  // 현재 재생 중인 오디오와 관련 엘리먼트 추적용
  let currentAudio = null;
  let currentMp3Icon = null;
  let currentMp3StartIcon = null;
  let currentMp3HoverWindow = null;

  podcastItems.forEach(function (item) {
    const mp3Icon = item.querySelector(".mp3_icon");
    const mp3StartIcon = item.querySelector(".mp3_start_icon");
    const mp3HoverWindow = item.querySelector(".mp3_hover_window");
    const audio = item.querySelector(".mp3_audio");
    const podcastImg = item.querySelector(".podcast_item_img");

    // 초기 상태 함수
    function setInitialState() {
      if (mp3Icon && mp3StartIcon) {
        mp3Icon.style.display = "block";
        mp3StartIcon.style.display = "none";
      }
    }

    if (mp3Icon && mp3StartIcon && mp3HoverWindow && audio && podcastImg) {
      // mp3_icon 클릭 시
      mp3Icon.addEventListener("click", function (e) {
        e.stopPropagation();

        // 모든 podcastImg에서 playing 클래스 제거
        document
          .querySelectorAll(".podcast_item_img.playing")
          .forEach(function (img) {
            img.classList.remove("playing");
          });

        // 다른 오디오가 재생 중이면 정지
        if (currentAudio && currentAudio !== audio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          if (currentMp3Icon && currentMp3StartIcon && currentMp3HoverWindow) {
            currentMp3Icon.style.display = "block";
            currentMp3StartIcon.style.display = "none";
          }
        }

        mp3Icon.style.display = "none";
        mp3StartIcon.style.display = "block";
        mp3HoverWindow.style.display = "none";
        audio.currentTime = 0;
        audio.play();

        // 현재 재생 중인 오디오 정보 갱신
        currentAudio = audio;
        currentMp3Icon = mp3Icon;
        currentMp3StartIcon = mp3StartIcon;
        currentMp3HoverWindow = mp3HoverWindow;

        // 현재 아이템에만 playing 클래스 추가
        podcastImg.classList.add("playing");
      });

      // mp3_start_icon 클릭 시
      mp3StartIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        mp3Icon.style.display = "block";
        mp3StartIcon.style.display = "none";
        mp3HoverWindow.style.display = "block";
        audio.pause();
        audio.currentTime = 0;

        // 정지 시 현재 재생 중인 오디오 정보 초기화
        if (currentAudio === audio) {
          currentAudio = null;
          currentMp3Icon = null;
          currentMp3StartIcon = null;
          currentMp3HoverWindow = null;
        }

        podcastImg.classList.remove("playing");
      });

      // 오디오가 끝나면 아이콘 상태 원복
      audio.addEventListener("ended", function () {
        mp3Icon.style.display = "block";
        mp3StartIcon.style.display = "none";
        mp3HoverWindow.style.display = "block";
        if (currentAudio === audio) {
          currentAudio = null;
          currentMp3Icon = null;
          currentMp3StartIcon = null;
          currentMp3HoverWindow = null;
        }

        podcastImg.classList.remove("playing");
      });

      // podcastImg에서 마우스를 올리면 mp3HoverWindow 보임 (항상 보이게)
      podcastImg.addEventListener("mouseenter", function () {
        mp3HoverWindow.style.display = "block";
      });

      // podcastImg에서 마우스가 떠나가면 mp3HoverWindow 숨김
      podcastImg.addEventListener("mouseleave", function () {
        mp3HoverWindow.style.display = "none";
        // mp3StartIcon이 보일 때는 항상 보이게!
        if (mp3StartIcon.style.display === "block") {
          mp3StartIcon.style.display = "block";
        }
      });

      // 초기상태
      setInitialState();
    }
  });
});
