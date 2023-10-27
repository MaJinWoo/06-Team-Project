let movieLists = []; // 맨 처음에 로딩될 때 가져온 영화 데이터를 담는 변수
const $inputSearch = document.querySelector(".input-search");
const $formSearch = document.getElementById("search");
const banner = document.querySelector(".banner");
const scrollToTopButton = document.querySelector(".top__btn");
let newMovie;
let newBackgroundImage;

// 테스트용
const $sectionTest = document.getElementById("section-test");

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTMxMTkzMzc4YTk5NDBjMmI0MTc0YzllODQ4ZDg0ZiIsInN1YiI6IjY1MmYyNTY5YTgwMjM2MDEzNzY4ODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESuIrOoB0i0HC3Br_KfTTrmIKFqSVxDhup_-ihC_zMs",
    },
};

window.onload = init;

async function init() {
    await fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
        .then((response) => response.json())
        .then((data) => {
            movieLists = data.results;
            movieLists.forEach((result) => {
                movieCard(result);
            });
            // *** 진우 : local staorage에 영화 정보 저장
            saveMovieLocal();
        })
        .catch((err) => console.error(err));

    moviebanner();
}

// *** 진우 : 카드 클릭하면 id가 local storage에 저장
function cardClick(id) {
    window.localStorage.setItem("clickedID", id);
    window.location.href = "movieDetail.html";
}

// making movie card
function movieCard(movie) {
    const title = movie["title"];
    const posterPath = movie["poster_path"];
    const voteAverage = movie["vote_average"];
    const id = movie["id"];
    const subTitle = movie["original_title"];

    const card = document.createElement("div");
    const image = document.createElement("img");
    const titleHTML = document.createElement("h3");
    const voteAverageHTML = document.createElement("p");
    const subHTML = document.createElement("p");
    const moviecard = document.querySelector(".movie__card");

    titleHTML.append(title);
    voteAverageHTML.innerHTML = makeStars(voteAverage);
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

    card.addEventListener("click", () => cardClick(id));
}

// -----섹션 1 미리보기 카드

function moviebanner() {
    const randomNumber = Math.floor(Math.random() * 20);
    newMovie = movieLists[randomNumber];
    newBackgroundImage = newMovie.backdrop_path;
    banner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;

    const stars = makeStars(newMovie.vote_average);

    banner.innerHTML = ` <div class="card__detail">
  <div class="detail__left">
      <h3 class="mini-title">${newMovie.original_title}</h3>
      <h2 class="detail__title">${newMovie.title}</h2>
      <div class="detail__info-box">
          <div class="stars">
            ${stars}          
              <span class="average">${newMovie.vote_average}</span>
          </div>
          <p class="overview">${newMovie.overview}</p>
      </div>
      <button class="detail__button">
          자세히 보기
      </button>
  </div>
  <div class="detail__right">
      <img width="268" height="382" src="https://image.tmdb.org/t/p/w500/${newMovie.poster_path}">
  </div>  
</div>`;
    //디테일 버튼을 클릭하면 상세 페이지로 이동
    const detail__btn = document.querySelector(".detail__button");
    detail__btn.addEventListener("click", () => {
        cardClick(newMovie.id);
    });
}

// 1. 카드를 가져온다
// 2. 실제 데이터를 넣어준다
// 3. 랜덤으로 데이터를 돌린다.

// *** 진우 : movie에 영화정보 저장
function saveMovieLocal() {
    window.localStorage.setItem("movie", JSON.stringify(movieLists));
}

// branch chul주석
// dom의 input요소 및 from요소 선택!

// form의 submit시 input의 값에 이상이 있는지 확인하기위해 form의 이벤트리스너를 달아주었다.
//$formSearch.addEventListener('submit', onsubmitSearch);

// ---- 진우 : 검색기능 추가 ---
$formSearch.addEventListener("submit", search);

function search(e) {
    e.preventDefault(); //기본동작 정지
    const inputValue = $inputSearch.value.toUpperCase();
    const filterdValue = filterValueFn(inputValue);

    console.log(filterdValue);
    if (filterdValue) {
        const moviecard = document.getElementById("movie_info");
        moviecard.innerHTML = "";
        let filteredMovies = movieLists.filter(
            (movie) => movie.title.includes(inputValue) || movie.original_title.toUpperCase().includes(inputValue)
        );
        filteredMovies.forEach((result) => {
            movieCard(result);
        });
    }
    return;
}
// ----------------------------------

//from이 submit시 실행될 함수 정의
function filterValueFn(inputValue) {
    // submit이벤트 사용시 주의점 * 서브밋 시 기본동작으로 페이지가 새로고침됩니다.
    // 그러므로 이벤트리스너가 반환하는 인지인 이벤트(e)를 가지고 기본동작을 멈춰줘야합니다.
    const trimInputValue = inputValue.trim(); //인풋의 벨류를 변수로저장 .trim()은 양쪽에 공백를 제거해주는 함수이다.
    console.log(trimInputValue); //인풋밸류를 잘 가지고왔는지 확인하기위한 콘솔로그

    // input의 값이 "  "등 빈 공백이면 안된다.
    // trim()을 사용했기떄문에 "        " 이렇게 입력해도 ""와 같아집니다.
    let isEmpty = false; // 인풋의 값이 비어있는지를 나타내는 변수 기본값은 false
    if (trimInputValue === "") {
        // 인풋이 비어있을경우 isEmpty를 true로 만들어줍니다.
        isEmpty = true;
    }

    // inpurt의 값에 특정 특수문자가 포함되면 안된다.
    const specialWord = "@#$%^&*()_+[]:;<>\\"; // 사용불가능한 특수문자목록
    let hasSpecialWord = false; // 벨류에 스페셜워드가 포함되었는지를 나타내는 변수이다 기본값은 false
    // 반복문을 통해 벨류에 스페셜워드가 포함되어있는지 확인해야한다.
    for (let i = 0; i < trimInputValue.length; i++) {
        if (specialWord.includes(trimInputValue[i])) {
            // 밸류의 i번째 요소가 스페셜워드에 포함된다면 hasSpecialWord를 true로 만든다.
            // 아니면 계속 반복
            hasSpecialWord = true;
            break; // 스페셜워드가 있을경우 반복문을 중단한다.
        }
    }

    if (isEmpty) {
        // 만약인풋이 비어있다면 함수는 아래의 경고를 리턴하고 종료합니다.
        alert("빈 문자열은 입력하실 수 없어요");
        return false;
    }

    if (hasSpecialWord) {
        // 만약 사용할수없는 특문사용시 아래의 경고를 리턴하고 종료합니다.
        alert(`사용하실 수 없는 특수문자${specialWord} 를 사용하셨습니다.`);
        return false;
    }

    return true;

    // 이제 인풋은 허가되지않은 특수문자나 빈문자열의 입력이 불가능해진 상태입니다.
    // 올바른 검색어를 입력했을때 실행될 로직을 아래에 입력해주셔야합니다.
}

// 지연_______________________________________________________________________
// scroll 했을 때 fixed header
// scrollToTop
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

//search 버튼 클릭 시 노출
const searchButton = document.querySelector(".button-search-open");
const searchForm = document.querySelector("#search");
searchButton.addEventListener("click", function () {
    searchForm.classList.contains("hide") ? searchForm.classList.remove("hide") : searchForm.classList.add("hide");
});

let changeBannerColor = function () {
    if (document.documentElement.classList.contains("light-mode")) {
        console.log("light-mode");
        banner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #ffffff, rgba(255,255,255,0.9), rgba(0,0,0,0))`;
    } else {
        console.log("NOT light-mode");
        banner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${newBackgroundImage}'), linear-gradient(to right, #000000, rgba(0,0,0,0.9), rgba(0,0,0,0))`;
    }
};

// 평점을 가지고 별을 그려주는 함수이다.
function makeStars(average,) {
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

