//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.banner');
const movies = JSON.parse(localStorage.getItem('movie'));
const id = localStorage.getItem('clickedID');
/// 수정 메인페이지로 가는 버튼
const goHomeBtn = document.querySelector('.header__home');
const reviewForm = document.querySelector('.review__form');
const reviewCards = document.querySelector('.review__cards');
const totalReviewCount = document.querySelector('.total-review-count');
const reviewNickname = document.querySelector('.review__nickname');
const reviewPassword = document.querySelector('.review__password');
const reviewText = document.querySelector('.review__text');
const textCount = document.querySelector('.text-count');
const scrollToTopButton = document.querySelector(".top__btn");
const enreview = document.querySelector('.entire__review');
const reviewList = document.querySelector('.review__list')

let reviews = [];
let reviewCount = 0; //리뷰 갯수
let reviewStarCount = 2; //별의 기본값
let newBackgroundImage;


function showReviews() {
    //기존에 작성된 리뷰가 있는지 확인함
    const checked = JSON.parse(localStorage.getItem(`reviews-${id}`));
    //작성된 리뷰가 없으면 전체 리뷰를 보여주지 않음
    if (checked === null) return;
    //작성된 리뷰가 있으면 기존에 저장된 리뷰들을 reviews 배열에 재할당한다. 
    reviews = checked;
    //작성된 리뷰 갯수 불러올 때 리뷰 갯수 업데이트
    reviewCount = reviews.length;
    updateReviewCount(reviewCount);
    reviews.forEach(review => {
        const getReview = createReview(review.nickname, review.text, review.date, review.reviewStarCount);
        reviewCards.appendChild(getReview);
    })
}

function createReview(name, comment, date, start) {
    //전체 리뷰에 리뷰가 추가됨. 
    const reviewCard = document.createElement('div');
    reviewCard.setAttribute('class', 'review__card');
    reviewCard.innerHTML = `<div class="card-wrapper">
                                <div class="review__starbox">
                               ${makeStars(start)}
                            </div>
                            <div class="review__date">
                            ${date}
                            </div>
                        </div>
                        <p class="review__content">${comment}</p>
                        <span class="user__name">${name}</span>
                        </div>`;
    return reviewCard;

}

function saveReviews() {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
}

function updateReviewCount(num) {
    totalReviewCount.innerText = num;
}

function addReview() {
    const nickname = reviewNickname.value;
    const password = reviewPassword.value;
    const text = reviewText.value;
    const date = new Date().toLocaleDateString();
    const newReview = createReview(nickname, text, date, reviewStarCount);
    //리뷰 리스트에 입력한 리뷰 추가
    reviewCards.appendChild(newReview);
    reviews.push({
        nickname: nickname,
        password: password,
        text: text,
        date: date,
        reviewStarCount
    });
    reviewCount += 1;
    updateReviewCount(reviewCount);
    saveReviews();
    reviewNickname.value = '';
    reviewPassword.value = '';
    reviewText.value = '';
}

function goHome() {
    window.location.href = "index.html";
}
function getDetail() {

    const selectedMovie = movies.find(movie => movie.id == id);
    newBackgroundImage = selectedMovie.backdrop_path;
    movieDetail.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;

    let { original_title, title, poster_path, vote_average, overview } = selectedMovie;
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    vote_average = +vote_average.toFixed(1);
    const detail__left = document.createElement('div');
    const movieMiniTitle = document.createElement('h3');
    ///
    const card__detail = document.createElement('div');
    card__detail.setAttribute('class', 'card__detail');
    detail__left.setAttribute('class', 'detail__left');
    //----
    movieMiniTitle.setAttribute('class', 'mini-title');
    movieMiniTitle.textContent = original_title;

    const movieTitle = document.createElement('h2');
    movieTitle.setAttribute('class', 'detail__title');
    movieTitle.textContent = title;

    const stars = document.createElement('div');
    stars.setAttribute('class', 'stars')
    stars.innerHTML = makeStars(vote_average);

    const score = document.createElement('span');
    score.setAttribute('class', 'average');
    score.innerHTML = `${vote_average}`;
    stars.appendChild(score);

    const content = document.createElement('p');
    content.setAttribute('class', 'overview')
    content.textContent = overview;

    const detail__right = document.createElement('div');
    detail__right.setAttribute('class', 'detail__right');

    const img = document.createElement('img');
    img.setAttribute('src', poster_path);
    img.setAttribute('width', "268");
    img.setAttribute('height', "382");
    movieDetail.appendChild(card__detail);
    card__detail.appendChild(detail__left);
    card__detail.appendChild(detail__right);
    detail__left.appendChild(movieMiniTitle);
    detail__left.appendChild(movieTitle);
    detail__left.appendChild(stars);
    detail__left.appendChild(content);
    detail__right.appendChild(img);
    showReviews();


}

function updateTextCount() {
    //텍스트를 입력할 때 마다 글자 수 업데이트트
    const count = reviewText.value.length;
    if (count > 1000) {
        alert('1000자 미만으로 입력하세요');
        return;
    }
    textCount.innerText = `${count}/1000`;
}

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addReview();
    reviewStarReset()
});
reviewText.addEventListener('keyup', updateTextCount)
goHomeBtn.addEventListener('click', goHome);
window.addEventListener('load', getDetail);




// 
// 평점을 가지고 별을 그려주는 함수이다.
function makeStars(average) {
    // 인자로 받는 average는 평점을 뜻한다.
    printStarIndex = Math.floor(average / 2); // 평점은 8.6 이런식으로 들어와서 Math.floor를사용해 내려주고 별점은 5점만점으로 2를 나눠주었다.

    // 각 변수는 채워진 별과 빈별을 뜻한다.
    const printStar = `
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
                      </svg>`;
    const emptyStar = `
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
                      </svg>`;

    let result = ``;
    // 반복문을 사용하였다 별의 최대 갯수는 5개이므로 i는 1~5까지의 값을 가질 수 있으며 한사이클 돌때마다 +1된다.
    // i가 printStartIndex보다 작거나 같을때 result은 기존에 있던 값에 printStart를 추가하게 된다 (+= 더하고 할당하기)
    // 만약 i가 printStartIndex보다 크다면 emptyStar을 추가하게된다.
    for (let i = 1; i <= 5; i++) {
        if (i <= printStarIndex) {
            result += printStar;
        } else {
            result += emptyStar;
        }
    }
    return result;
}


// 별점을 줄수있는 함수입니다.
// html은 박스 및에 5개의 빈 별이 들어가있는 상태입니다.
// 박스에 클릭 이벤트 리스너를 달아줍니다.
// 문제점 svg요소를 클릭시 정상 작동하나 path부분을 클릭시 버그 발생..

const $reviewStarbox = document.querySelector('.review__starbox');
function reviewStarReset() {
    const defaultHtml = ` <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124"
        d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z" />
</svg>`;
    $reviewStarbox.innerHTML = defaultHtml
    reviewStarCount = 2
}


$reviewStarbox.addEventListener('click', (e) => modifyStars(e, $reviewStarbox))
function modifyStars(e, starBox) {
    if (e.target.tagName === "path") {
        e.target = e.target.parentElement; // path 요소를 클릭했을 때 버그수정을 위해 부모인 svg 요소를 대상으로 변경
    }
    if (e.target.tagName !== "svg") return; // div같은거 가끔 눌려서 그때마다 버그걸리는거 수정을 위해 조건 추가.

    const parentNodeList = Array.from(starBox.children); // 해당변수는 별을 담고있는 박스의 자식요소들을 가져옵니다.
    // html요소들은 htmlcollection이라는 요소로 배열처럼 생겼지만 배열이 아닙니다.
    // 그러므로 Array.from()안에 담아서 배열로 바꿔줍니다.(배열 메소드 사용하기 위해)

    const printIndex = parentNodeList.indexOf(e.target); //indexOf라는 배열메소드를 사용하여 지금 클릭한 타겟이 몇번째 요소인지 찾습니다.
    //e라는건 이벤트로 e.target은 현재 이벤트가 일어난(클릭된 녀석)녀석입니다.
    reviewStarCount = (printIndex + 1) * 2
    // 박스가 가진 별의 수만 큼 반복하는 함수를 실행하여 인덱스가 프린트인덱스보다 작거나 같으면 채워진 별을 innerHtml로 덮어주고
    // 아닌경우 빈별을 innerHtml로 덮어줍니다.
    parentNodeList.forEach((children, index) => {
        if (index <= printIndex) {
            parentNodeList[index].innerHTML = `
                                              
                                                <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
                                              `;
        } else {
            parentNodeList[index].innerHTML = `
                                                <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
                                              `;
        }
    });
}





// darkmode control

const darkButton = document.querySelector(".button-darkmode");
const lightButton = document.querySelector(".button-lightmode");
darkButton.addEventListener("click", function () {
    this.style.opacity = "0";
    this.style.zIndex = "0";
    lightButton.style.opacity = "1";
    lightButton.style.zIndex = "1";
    document.documentElement.classList.add("light-mode");
    changeBannerColor();
});
lightButton.addEventListener("click", function () {
    this.style.opacity = "0";
    this.style.zIndex = "0";
    darkButton.style.opacity = "1";
    darkButton.style.zIndex = "1";
    document.documentElement.classList.remove("light-mode");
    changeBannerColor();
});

let changeBannerColor = function () {
    if (document.documentElement.classList.contains("light-mode")) {
        movieDetail.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #ffffff, rgba(255,255,255,0.9), rgba(0,0,0,0))`;
    } else {
        movieDetail.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;
    }
};




window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    let windowTop = window.scrollY;

    if (windowTop > 0) {
        header.style.position = "fixed";
        header.style.top = "0";
    } else {
        header.style.position = "relative";
    }

    if (window.scrollY > 200) {
        scrollToTopButton.style.opacity = "1";
    } else {
        scrollToTopButton.style.opacity = "0";
    }
});

scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});


// 리뷰 작성 버튼, 전체 리뷰 버튼 클릭 시 이동
enreview.addEventListener("click", function () {

    // .review__list 요소의 높이 가져오기
    const reviewListData = reviewList.getBoundingClientRect();
    const reviewListTop = reviewListData.top;

    window.scrollTo({
        top: reviewListTop,
        behavior: "smooth"
    })
});