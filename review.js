//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.banner');
const movies = JSON.parse(localStorage.getItem('movie'));
const id = localStorage.getItem('clickedID');
/// 수정 메인페이지로 가는 버튼
const goHomeBtn = document.querySelector('.header__home');
goHomeBtn.addEventListener('click',goHome);
function goHome(){
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
    score.innerHTML =  `${vote_average}`;
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


}

window.addEventListener('load', getDetail);






// 진우코드 (리뷰기능과 회원가입 기능 추가)
const $review__text = document.querySelector('.review__text');
const $review__nickname = document.querySelector('.review__nickname');
const $review__password = document.querySelector('.review__password');
const $review__button = document.querySelector('.register__btn');
const $review__card = document.querySelector('.review__card');
const $review__list = document.querySelector('.review__list');

function registerReview(e){
    e.preventDefault();
    let review = $review__text.value;
    let nickname = $review__nickname.value;
    let password = $review__password.value;

    let userInfo = [];
    userInfo = [review,nickname,password];

    // userInfo.forEach((value)=>{filterValueFn(value)});

    window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(userInfo);

    let userReviewName = document.createElement('div');
    let userName = document.createElement('span');
    let userReview = document.createElement('p');
    let reviewDate = document.createElement('span');
    
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    userReviewName.setAttribute('class', 'review__card');
    reviewDate.setAttribute('class', 'review__date');
    userName.setAttribute('class', 'user__name');
    userReview.setAttribute('class', 'review__content');
    
    userReviewName.appendChild(userName);
    userReviewName.appendChild(userReview);
    userReviewName.appendChild(reviewDate);

    $review__list.appendChild(userReviewName);

    userName.append(nickname);
    userReview.append(review);
    reviewDate.innerHTML = `${year}. ${month}. ${date}.`;

    return;

}

$review__button.addEventListener('click',registerReview);


// 초기화
function resetReviewForm(){
    $review__text.value = '';
    $review__nickname.value = '';
    $review__password.value = '';
}

$review__button.addEventListener('click',resetReviewForm);








// function filterValueFn(inputValue) {
//     // submit이벤트 사용시 주의점 * 서브밋 시 기본동작으로 페이지가 새로고침됩니다.
//     // 그러므로 이벤트리스너가 반환하는 인지인 이벤트(e)를 가지고 기본동작을 멈춰줘야합니다.
//     const trimInputValue = inputValue.trim(); 
//     console.log(trimInputValue);

//     let isEmpty = false; 
//     if (trimInputValue === '') {
//       isEmpty = true;
//     }
  
//     const specialWord = '@#$%^&*()_+[]:;<>\\'; 
//     let hasSpecialWord = false;
//     for (let i = 0; i < trimInputValue.length; i++) {
//       if (specialWord.includes(trimInputValue[i])) {
//         hasSpecialWord = true;
//         break;
  
//       }
//     }
  
//     if (isEmpty) {
//       alert('빈 문자열은 입력하실 수 없어요');
//       return false
//     }
   
//     if (hasSpecialWord) {
//       alert(`사용하실 수 없는 특수문자${specialWord} 를 사용하셨습니다.`);
//       return false
//     } 
  
//     return true
  
//   }