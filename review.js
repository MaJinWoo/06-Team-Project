//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.banner');
const movies = JSON.parse(localStorage.getItem('movie'));
const id = localStorage.getItem('clickedID');
/// 수정 메인페이지로 가는 버튼
const goHomeBtn = document.querySelector('.header__home');
const reviewForm = document.querySelector('.review__form');
const reviewList = document.querySelector('.review__list');
const reviewNickname = document.querySelector('.review__nickname');
const reviewPassword = document.querySelector('.review__password');
const reviewText = document.querySelector('.review__text');

let reviews = [];

function showReviews() {
    //기존에 리뷰가 없으면 전체리뷰를 보여주지 않음
    if (!reviews) return;
    reviews = JSON.parse(localStorage.getItem('reviews'));

    //로컬 스토리지에 저장된 리뷰들을 불러옴
    reviews.forEach(review => {
        const getReview = createReview(review.nickname, review.text);
        reviewList.appendChild(getReview);
    })


}

function createReview(name, comment) {
    //전체 리뷰에 리뷰가 추가됨. 
    const reviewCard = document.createElement('div');
    reviewCard.setAttribute('class', 'review__card');
    reviewCard.innerHTML = `<div class="card-wrapper">
                                <div class="review__stars">
                                    별별별별별
                                </div>
                            <div class="review__date">
                            ${new Date().toLocaleDateString()}
                            </div>
                        </div>
                        <p>${comment}</p>
                        <span>${name}</span>
                        <span style="display: block;"> 따봉</span>
                        </div>`;
    return reviewCard;

}

function saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function addReview() {
    const nickname = reviewNickname.value;
    const password = reviewPassword.value;
    const text = reviewText.value;
    const newReview = createReview(nickname, text);
    //리뷰 리스트에 입력한 리뷰 추가
    reviewList.appendChild(newReview);
    reviews.push({
        nickname: nickname,
        password: password,
        text: text
    });
    saveReviews();
    reviewNickname.value = '';
    reviewPassword.value = '';
    reviewText.value = '';
}

function goHome() {
    window.location.href = "mymoviesite.html";
}
function getDetail() {
    const selectedMovie = movies.find(movie => movie.id == id);
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
    stars.setAttribute('class', 'stars')
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
    content.setAttribute('class', 'overview')
    content.textContent = overview;

    const detail__right = document.createElement('div');
    //----
    detail__right.setAttribute('class', 'detail__right');
    //----

    const img = document.createElement('img');
    img.setAttribute('src', poster_path);
    img.setAttribute('width', "268");
    img.setAttribute('height', "382");
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
    showReviews();


}

reviewForm.addEventListener('submit', (e) => {
    addReview();
    e.preventDefault()
});
goHomeBtn.addEventListener('click', goHome);
window.addEventListener('load', getDetail);