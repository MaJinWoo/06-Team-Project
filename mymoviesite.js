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

fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
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

// making movie card
function movieCard(movie) {
    const title = movie["title"];
    const overview = movie["overview"];
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
    voteAverageHTML.append(voteAverage);
    image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    subHTML.append(subTitle);

    // *** 진우 : card div에 id 별로 클래스명 지정
    card.className = id;

    moviecard.appendChild(card);
    card.appendChild(image);
    card.appendChild(titleHTML);
    card.appendChild(subHTML);

    card.appendChild(voteAverageHTML);

    // *** 진우 : 카드 클릭하면 id가 local storage에 저장

    function cardClick() {
        window.localStorage.setItem("clickedID", id);
    }
    card.addEventListener("click", cardClick);
}

// *** 진우 : movie에 영화정보 저장
function saveMovieLocal() {
    window.localStorage.setItem("movie", JSON.stringify(movieLists));
}

// function searchMovie() {
//     function search() {
//         const moviecard = document.getElementById('movie_info');
//         moviecard.innerHTML = ''; // 막혔던 부분 : 지웠다 실행해주면 해결
//         inputValue = input.value.toUpperCase();
//         // let filteredMovies = movieLists.filter((movie)=>inputValue===movie.title.toUpperCase());
//         let filteredMovies = movieLists.filter((movie) => movie.title.toUpperCase().includes(inputValue));
//         // 단어만 겹쳐도 검색이 가능하도록 만들기!
//         // => includes 사용해서 성공
//         filteredMovies.forEach((result) => {
//             movieCard(result);
//         });
//         console.log(filteredMovies.title);
//     }
//     // button.addEventListener('click',search); // 검색 버튼을 눌렀을 때 search
//     input.addEventListener('keyup', search); // 키보드 검색과 동시에 search
// } // 기존 것들을 지우고 찍어야 한다.
// searchMovie();

// branch chul주석
// dom의 input요소 및 from요소 선택!
const $inputSearch = document.querySelector(".input-search");
const $formSearch = document.getElementById("search");

// form의 submit시 input의 값에 이상이 있는지 확인하기위해 form의 이벤트리스너를 달아주었다.
$formSearch.addEventListener("submit", onsubmitSearch);

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
    if (value === "") {
        // 인풋이 비어있을경우 isEmpty를 true로 만들어줍니다.
        isEmpty = true;
    }

    // inpurt의 값에 특정 특수문자가 포함되면 안된다.
    const specialWord = "@#$%^&*()_+[]:;<>\\"; // 사용불가능한 특수문자목록
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
        return alert("빈 문자열은 입력하실 수 없어요");
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
