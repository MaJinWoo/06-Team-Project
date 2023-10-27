//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.banner');
const movies = JSON.parse(localStorage.getItem('movie'));
const id = localStorage.getItem('clickedID');
/// 수정 메인페이지로 가는 버튼
const goHomeBtn = document.querySelector('.header__home');
goHomeBtn.addEventListener('click', goHome);
function goHome() {
    window.location.href = 'mymoviesite.html';
}
function getDetail() {
    const selectedMovie = movies.find((movie) => movie.id == id);
    let { original_title, title, poster_path, vote_average, overview } = selectedMovie;
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
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
    stars.setAttribute('class', 'stars');
    stars.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
</svg>
<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
</svg>
<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
</svg>
<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
</svg>
<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
</svg>`;

    const score = document.createElement('span');
    score.setAttribute('class', 'average');
    score.innerHTML = `${vote_average}`;
    stars.appendChild(score);

    const content = document.createElement('p');
    content.setAttribute('class', 'overview');
    content.textContent = overview;

    const detail__right = document.createElement('div');
    //----
    detail__right.setAttribute('class', 'detail__right');
    //----

    const img = document.createElement('img');
    img.setAttribute('src', poster_path);
    img.setAttribute('width', '268');
    img.setAttribute('height', '382');
    ///
    movieDetail.appendChild(card__detail);
    card__detail.appendChild(detail__left);
    card__detail.appendChild(detail__right);
    detail__left.appendChild(movieMiniTitle);
    detail__left.appendChild(movieTitle);
    detail__left.appendChild(stars);
    detail__left.appendChild(content);
    ///
    detail__right.appendChild(img);
}

window.addEventListener('load', getDetail);

// 리뷰함수
// 필요한 dom요소
const $reviewForm = document.querySelector('.review__form');
const $reviewText = document.querySelector('.review__text');
const $reviewNickname = document.querySelector('.review__nickname');
const $reviewPassword = document.querySelector('.review__password');
const $reviewCardContainer = document.querySelector('.review__card-container');
// 리뷰리스트들
let reviewList = [];

// 창로드 후 로드리뷰실행
window.onload = loadReviews;

// 리뷰 불러오기
function loadReviews() {
    // review-${id}의 키에 있는 데이터들을 가져온다(리뷰들이다.)
    const reviews = JSON.parse(localStorage.getItem(`review-${id}`));
    // 리뷰리스트에 가져온 리뷰들을 넣어준다.
    reviewList = [...reviews];
    makeReview();
}

// 리뷰 저장하기
// 리뷰폼이 서브밋되면 리뷰서브밋 실행
$reviewForm.addEventListener('submit', reviewSubmit);

function reviewSubmit(e) {
    // 서브밋 이므로 기본동작은 멈춰준다.
    e.preventDefault();

    // 리뷰내용 패스워드 닉네임의 벨류를 모두 가져온다
    const reviewText = $reviewText.value;
    const reviewPassword = $reviewPassword.value;
    const reviewNickname = $reviewNickname.value;
    const reviewDate = new Date();

    // 리스트에 인전 리스트 값을 넣고 추가로 객체로 만들어서 각 벨류값을 저장한다.
    reviewList = [...reviewList, { reviewText, reviewPassword, reviewNickname, reviewDate }];

    // 현재 영화의 id를 변수선언해둔 것을 활용하여 review-id의 키값에 리뷰 리스트들을 저장한다.
    localStorage.setItem(`review-${id}`, JSON.stringify(reviewList));

    // 이후 벨류를 모두 없애준다.
    $reviewText.value = '';
    $reviewNickname.value = '';
    $reviewPassword.value = '';
    makeReview();
}

// 리뷰를 생성하기

function makeReview() {
    const container = $reviewCardContainer;
    let reviewsHtml = ``;
    reviewList.forEach((review) => {
        const reviewCardInner = `
        <div class="review__card ${review.reviewPassword}">
        <div class="card-wrapper" >
            <div class="review__stars">
                별별별별별
            </div>
            <div class="review__date">
               작성일
            </div>
        </div>
        <p>${review.reviewText}</p>
        <span>${review.reviewNickname}</span>
        <span style="display: block;"> 따봉</span>
    </div>
        `;

        reviewsHtml += reviewCardInner;
    });

    console.log(reviewsHtml);
    container.innerHTML = reviewsHtml;
}
