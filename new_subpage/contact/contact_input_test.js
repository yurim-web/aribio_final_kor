// 입력한 정보

// EmailJS 초기화 (Public Key는 본인 걸로 교체)
emailjs.init("5BFePeky9oY5zEVVr");
document.getElementById("inquiry_type").value = ""; // 기존 값 초기화

// ✅ 선택된 문의 유형들을 저장할 배열
const selectedTypes = [];

document.querySelectorAll(".inquiry_btn[data-value]").forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.dataset.value.trim(); // 공백 제거
    const cleanValue = value.replace(/,/g, ""); // 쉼표 제거

    const index = selectedTypes.indexOf(cleanValue);

    if (index === -1) {
      selectedTypes.push(cleanValue);
      this.classList.add("active");
    } else {
      selectedTypes.splice(index, 1);
      this.classList.remove("active");
    }

    // ✅ 최종 값 공백 구분자로 조합 (쉼표 제거!)
    const result = selectedTypes
      .map((v) => v.replace(/,/g, ""))
      .filter(Boolean)
      .join("  ");

    document.getElementById("inquiry_type").value = result;

    console.log("문의유형 값:", result);
  });
});

// 제출버튼 동작
// 데스크탑용 제출 버튼 클릭 이벤트
// contact.js에 정의된 submitRequiredInputs를 활용
// (submitRequiredInputs는 .information_input:not(.last_btn_box .information_input) 셀렉터)
document
  .getElementById("second_submit_btn")
  .addEventListener("click", function () {
    // 버튼이 비활성화(disabled) 상태면 아무것도 하지 않음
    if (this.disabled) return;

    // 데스크탑 유효성 검사
    const submitRequiredInputs = document.querySelectorAll(
      ".information_input:not(.last_btn_box .information_input)"
    );
    const allFilled = Array.from(submitRequiredInputs).every(
      (input) => input.value.trim() !== ""
    );
    if (!allFilled) {
      // alert("모든 필수 입력값을 입력해주세요.");
      return;
    }

    // 이메일 전송
    emailjs
      .sendForm(
        "service_xv6r5s9",
        "template_g3g2sac",
        document.getElementById("contact-form")
      )
      .then(
        () => console.log("성공 => 이메일 전송됨!"),
        (err) => {
          console.log("실패 => 이메일 전송 실패!");
          alert("이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        }
      );
  });

// 예시: 모바일 제출 버튼이 따로 있을 경우
document
  .getElementById("next_btn_mobile")
  .addEventListener("click", function () {
    if (this.disabled) return;

    // 모바일 유효성 검사
    const allFilled = Array.from(mobileSubmitInputs).every(
      (input) => input.value.trim() !== ""
    );
    if (!allFilled) {
      alert("모든 필수 입력값을 입력해주세요.");
      return;
    }

    // 이메일 전송
    emailjs
      .sendForm(
        "service_xv6r5s9",
        "template_g3g2sac",
        document.getElementById("contact-form")
      )
      .then(
        () => console.log("성공 => 이메일 전송됨!"),
        (err) => {
          console.log("실패 => 이메일 전송 실패!");
          // alert("이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        }
      );
  });
