const $reviewForm = document.querySelector(".review__form");
const $textArea = document.querySelector(".review__text");
const $nicknameInput = document.querySelector(".review__nickname");
const $passwordInput = document.querySelector(".review__password");
const $reviewCardWrap = document.querySelector(".review__card-wrap");
let savedKeys = [];
let savedKeysName = "savedKeys";
// 리뷰 폼에 입력한 데이터 가져오기
// 저장 날짜
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const currentSaveDate = `${year}. ${month}. ${day}.`;

// 페이지 로드 시 저장된 리뷰 불러오기
window.addEventListener("DOMContentLoaded", () => {
    // 로컬 스토리지에서 savedKeys를 불러옴
    const savedKeysData = localStorage.getItem(savedKeysName);

    if (savedKeysData) {
        // savedKeys를 로컬 스토리지에서 불러온 데이터로 업데이트
        savedKeys = JSON.parse(savedKeysData);

        // 저장된 리뷰 키를 반복하고, 각 리뷰를 가져와서 표시
        savedKeys.forEach((saveKey) => {
            const savedReviewData = localStorage.getItem(saveKey);
            if (savedReviewData) {
                // 저장된 데이터가 있다면 파싱하여 JavaScript 객체로 변환
                const reviewData = JSON.parse(savedReviewData);
                // 가져온 데이터를 사용하여 리뷰 카드 생성 및 표시
                addReview(reviewData);
            }
        });
    }
});
// 리뷰 등록 및 표시 함수
let addReview = (reviewData) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review__card");

    // 리뷰 카드 내용을 작성
    let reviewContent = `
    <div class="review__card">
        <div class="card-wrapper">
        <div class="review__stars">
            <div class="stars">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#ed3124"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#ed3124"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#ed3124"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#ed3124"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                    ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#ed3124"
                        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"
                    ></path>
                </svg>
            </div>
        </div>
            <div class="review__date">
                ${currentSaveDate}
            </div>
        </div>
        <p class="review__content">${reviewData.reviewText}</p>
        <p class="user__name">${reviewData.nickname}</p>
    </div>`;

    // 리뷰 리스트에 작성 내용 추가
    reviewCard.innerHTML = reviewContent;
    $reviewCardWrap.appendChild(reviewCard);
};

let reviewData = (event) => {
    // 작성 내용
    const reviewText = $textArea.value;
    // 닉네임
    const nickname = $nicknameInput.value;
    // 비밀번호
    const password = $passwordInput.value;
    event.preventDefault();
    // 키 이름(닉네임_reviewData)
    const saveKey = `${nickname}_reviewData`;
    // 들어갈 값
    let reviewData = {
        nickname,
        reviewText,
        password,
    };

    // 저장된 리뷰 키를 배열에 추가
    savedKeys.push(saveKey);

    // localStorage에 저장
    let saveReviewData = () => {
        const updatedData = JSON.stringify(reviewData);
        // localStorage는 문자열 키-값 쌍만 저장할 수 있다
        // JSON.stringify는 JavaScript 개체를 JSON 문자열로 변환
        localStorage.setItem(saveKey, updatedData);
        // savedKeys도 업데이트된 배열로 로컬 스토리지에 저장
        localStorage.setItem(savedKeysName, JSON.stringify(savedKeys));
    };
    saveReviewData();

    // 새로운 리뷰 추가
    addReview(reviewData);
};
// 리뷰 등록하기
$reviewForm.addEventListener("submit", reviewData);
