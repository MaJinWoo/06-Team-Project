let movieLists = []; // 맨 처음에 로딩될 때 가져온 영화 데이터를 담는 변수
const button = document.getElementById("search-button");
const input = document.getElementById("search-input");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTMxMTkzMzc4YTk5NDBjMmI0MTc0YzllODQ4ZDg0ZiIsInN1YiI6IjY1MmYyNTY5YTgwMjM2MDEzNzY4ODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESuIrOoB0i0HC3Br_KfTTrmIKFqSVxDhup_-ihC_zMs",
  },
};


window.onload = init;

async function  init(){
  await fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
  .then(response => response.json())
  .then(data => {
    movieLists = data.results;
    movieLists.forEach((result) => {
      movieCard(result);

    });
    // *** 진우 : local staorage에 영화 정보 저장
    saveMovieLocal();
  })
  .catch(err => console.error(err));
  
  moviebanner();
  
}




// making movie card
function movieCard(movie) {
  const title = movie["title"];
  const overview = movie["overview"];
  const posterPath = movie["poster_path"];
  const voteAverage = movie["vote_average"];
  const id = movie["id"];
  const subTitle = movie["original_title"];

  const card = document.createElement('div');
  const image = document.createElement('img');
  const titleHTML = document.createElement('h3');
  const voteAverageHTML = document.createElement('p');
  const subHTML = document.createElement('p');
  const moviecard = document.querySelector('.movie__card');

  titleHTML.append(title);
  voteAverageHTML.append(voteAverage);
  image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
  subHTML.append(subTitle);

  card.className = id;

  moviecard.appendChild(card);
  card.appendChild(image);
  card.appendChild(titleHTML);
  card.appendChild(subHTML);

  card.appendChild(voteAverageHTML);


  // 카드 누르면 id 뜬다.
  // *** 진우 : 카드 클릭하면 id가 local storage에 저장

  function cardClick() {
    window.localStorage.setItem("clickedID", id);
    window.location.href = "movieDetail.html";

  }
  card.addEventListener('click', cardClick);

  }


// 섹션 1 미리보기 카드 
// 1. 카드를 가져온다
function moviebanner() {
  const banner = document.querySelector('.banner');
  const randomNumber = Math.floor(Math.random()*20);
  const newMovie = movieLists[randomNumber];

  banner.innerHTML=
  ` <div class="card__detail">
  <div class="detail__left">
      <h3 class="mini-title">${newMovie.original_title}</h3>
      <h2 class="detail__title">${newMovie.title}</h2>
      <div class="detail__info-box">
          <div class="stars">
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
                  <path fill="#ed3124" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"/>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#ed3124" d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425l-.825 3.575ZM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22ZM12 13.25Z"/>
              </svg>
              <span class="average">${newMovie.vote_average}</span>
          </div>
          <p class="overview">${newMovie.overview}</p>
      </div>
      <button class="detail__button">
          More
      </button>
  </div>
  <div class="detail__right">
      <img width="268" height="382" src="https://image.tmdb.org/t/p/w500/${newMovie.poster_path}">
  </div>  
</div>`
}
// 2. 실제 데이터를 넣어준다
// 3. 랜덤으로 데이터를 돌린다. 





// *** 진우 : movie에 영화정보 저장
function saveMovieLocal() {
  window.localStorage.setItem("movie", JSON.stringify(movieLists));
}


// branch chul주석
// dom의 input요소 및 from요소 선택!
const $inputSearch = document.querySelector('.input-search');
const $formSearch = document.getElementById('search');

// form의 submit시 input의 값에 이상이 있는지 확인하기위해 form의 이벤트리스너를 달아주었다.
$formSearch.addEventListener('submit', onsubmitSearch);

//from이 submit시 실행될 함수 정의
function onsubmitSearch(e) {
  // submit이벤트 사용시 주의점 * 서브밋 시 기본동작으로 페이지가 새로고침됩니다.
  // 그러므로 이벤트리스너가 반환하는 인지인 이벤트(e)를 가지고 기본동작을 멈춰줘야합니다.
  e.preventDefault(); //기본동작 정지
  const value = $inputSearch.value.trim(); //인풋의 벨류를 변수로저장 .trim()은 양쪽에 공백를 제거해주는 함수이다.
  console.log(value); //인풋밸류를 잘 가지고왔는지 확인하기위한 콘솔로그

  // input의 값이 "  "등 빈 공백이면 안된다.
  // trim()을 사용했기떄문에 "        " 이렇게 입력해도 ""와 같아집니다.
  let isEmpty = false; // 인풋의 값이 비어있는지를 나타내는 변수 기본값은 false
  if (value === '') {
    // 인풋이 비어있을경우 isEmpty를 true로 만들어줍니다.
    isEmpty = true;
  }

  // inpurt의 값에 특정 특수문자가 포함되면 안된다.
  const specialWord = '@#$%^&*()_+[]:;<>\\'; // 사용불가능한 특수문자목록
  let hasSpecialWord = false; // 벨류에 스페셜워드가 포함되었는지를 나타내는 변수이다 기본값은 false
  // 반복문을 통해 벨류에 스페셜워드가 포함되어있는지 확인해야한다.
  for (let i = 0; i < value.length; i++) {
    if (specialWord.includes(value[i])) {
      // 밸류의 i번째 요소가 스페셜워드에 포함된다면 hasSpecialWord를 true로 만든다.
      // 아니면 계속 반복
      hasSpecialWord = true;
      break; // 스페셜워드가 있을경우 반복문을 중단한다.

    }
  }

  if (isEmpty) {
    // 만약인풋이 비어있다면 함수는 아래의 경고를 리턴하고 종료합니다.
    return alert('빈 문자열은 입력하실 수 없어요');
  }
  if (hasSpecialWord) {
    // 만약 사용할수없는 특문사용시 아래의 경고를 리턴하고 종료합니다.
    return alert(`사용하실 수 없는 특수문자${specialWord} 를 사용하셨습니다.`);
  }

  // 이제 인풋은 허가되지않은 특수문자나 빈문자열의 입력이 불가능해진 상태입니다.
  // 올바른 검색어를 입력했을때 실행될 로직을 아래에 입력해주셔야합니다.
}



// 지연_______________________________________________________________________
// scroll 했을 때 fixed header
// scrollToTop
const scrollToTopButton = document.querySelector(".top__btn");
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

// darkmode control

const darkButton = document.querySelector(".button-darkmode");
const lightButton = document.querySelector(".button-lightmode");
darkButton.addEventListener("click", function () {
  this.style.opacity = "0";
  this.style.zIndex = "0";
  lightButton.style.opacity = "1";
  lightButton.style.zIndex = "1";
  document.body.classList.add("light-mode");
});
lightButton.addEventListener("click", function () {
  this.style.opacity = "0";
  this.style.zIndex = "0";
  darkButton.style.opacity = "1";
  darkButton.style.zIndex = "1";
  document.body.classList.remove("light-mode");
});
