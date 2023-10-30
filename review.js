import { changeMode } from "./darkMode.js";
import { getLocalStorage, saveLocalStorage } from "./localStorage.js";
import { fixedHeader, scrollTo } from "./scroll.js";
import { reviewStarReset, makeStars, modifyStars } from "./star.js";

//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.banner');
const movies = getLocalStorage('movie');
const id = getLocalStorage('clickedID');
const header = document.querySelector("#header");

/// 수정 메인페이지로 가는 버튼
const goHomeBtn = document.querySelector('.header__home');
// darkmode control
const darkButton = document.querySelector(".button-darkmode");
const lightButton = document.querySelector(".button-lightmode");

const reviewForm = document.querySelector('.review__form');
const reviewCards = document.querySelector('.review__cards');
const totalReviewCount = document.querySelector('.total-review-count');
const $reviewStarbox = document.querySelector('.review__starbox');
const reviewNickname = document.querySelector('.review__nickname');
const reviewPassword = document.querySelector('.review__password');
const reviewText = document.querySelector('.review__text');
const textCount = document.querySelector('.text-count');
const scrollToTopButton = document.querySelector(".top__btn");
const entireReview = document.querySelector('.entire__review');
const reviewList = document.querySelector('.review__list')

let reviews = [];
let reviewCount = 0; //리뷰 갯수
let reviewStarCount = 2; //별의 기본값
let newBackgroundImage;



function showReviews() {
    //기존에 작성된 리뷰가 있는지 확인함
    const checked = getLocalStorage(`review-${id}`);
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
    saveLocalStorage(`reviews-${id}`, reviews);
    reviewNickname.value = '';
    reviewPassword.value = '';
    reviewText.value = '';
}

function goHome() {
    window.location.href = "mymoviesite.html";
}

function getDetail() {
    const selectedMovie = movies.find(movie => movie.id == id);
    newBackgroundImage = selectedMovie.backdrop_path;
    movieDetail.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;

    let { original_title, title, poster_path, vote_average, overview } = selectedMovie;
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const detail__left = document.createElement('div');
    const movieMiniTitle = document.createElement('h3');

    const card__detail = document.createElement('div');
    card__detail.setAttribute('class', 'card__detail');
    detail__left.setAttribute('class', 'detail__left');

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
    //텍스트를 입력할 때 마다 글자 수 업데이트
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
    reviewStarReset($reviewStarbox, reviewStarCount);
});
reviewText.addEventListener('keyup', updateTextCount)
goHomeBtn.addEventListener('click', goHome);
window.addEventListener('load', getDetail);



$reviewStarbox.addEventListener('click', (e) => {
    reviewStarCount = modifyStars(e.target, $reviewStarbox, reviewStarCount)
})
darkButton.addEventListener("click", () => changeMode(darkButton, lightButton, movieDetail, newBackgroundImage));
lightButton.addEventListener("click", () => changeMode(lightButton, darkButton, movieDetail, newBackgroundImage));
window.addEventListener("scroll", () => fixedHeader(header, scrollToTopButton));
scrollToTopButton.addEventListener("click", () => scrollTo(0));


// 리뷰 작성 버튼, 전체 리뷰 버튼 클릭 시 이동)
entireReview.addEventListener("click", () => {
    // .review__list 요소의 높이 가져오기
    const reviewListData = reviewList.getBoundingClientRect();
    const reviewListTop = reviewListData.top;
    scrollTo(reviewListTop)
});



