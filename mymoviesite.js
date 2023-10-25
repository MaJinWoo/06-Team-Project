let movieLists = []; // 맨 처음에 로딩될 때 가져온 영화 데이터를 담는 변수
const button = document.getElementById('search-button');
const input = document.getElementById('search-input');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTMxMTkzMzc4YTk5NDBjMmI0MTc0YzllODQ4ZDg0ZiIsInN1YiI6IjY1MmYyNTY5YTgwMjM2MDEzNzY4ODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESuIrOoB0i0HC3Br_KfTTrmIKFqSVxDhup_-ihC_zMs',
    },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
    .then((response) => response.json())
    .then((data) => {
        // 전역변수에 담자
        // 처음엔 전체 영화 출력

        movieLists = data.results;
        movieLists.forEach((result) => {
            movieCard(result);
        });
        // 검색어가 들어온다면 검색한 단어를 포함하고 있는 영화만 출력
        // the => the godfather...
        // filterdMovie는 movieList에 키워드가 포함된 영화만 필터링된 배열이다.
    })
    .catch((err) => console.error(err));

// making movie card
function movieCard(movie) {
    const title = movie['title'];
    const overview = movie['overview'];
    const posterPath = movie['poster_path'];
    const voteAverage = movie['vote_average'];
    const id = movie['id'];
    const subTitle = movie['original_title'];

    const card = document.createElement('div');
    const image = document.createElement('img');
    const titleHTML = document.createElement('h3');
    // const overviewHTML = document.createElement('p');
    const voteAverageHTML = document.createElement('p');
    const subHTML = document.createElement('p');
    const moviecard = document.querySelector('.movie__card');

    titleHTML.append(title);
    // overviewHTML.append(overview);
    voteAverageHTML.append(voteAverage);
    image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    subHTML.append(subTitle);

    moviecard.appendChild(card);
    card.appendChild(image);
    card.appendChild(titleHTML);
    card.appendChild(subHTML);

    // card.appendChild(overviewHTML);
    card.appendChild(voteAverageHTML);

    // 카드 누르면 id 뜬다.
    card.addEventListener('click', (card) => {
        alert(`ID : ${id}`);
    });
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
        return alert(`사용하실 수 없는 특수문자${specialWord} 를 사용하셨습니다. 입니다.`);
    }

    // 이제 인풋은 허가되지않은 특수문자나 빈문자열의 입력이 불가능해진 상태입니다.
    // 올바른 검색어를 입력했을때 실행될 로직을 아래에 입력해주셔야합니다.
}

// onclick 여ㄴ결
// 키워드에 맞게 갱신
// 키워드 찾아내기
// 검색

// 1. 화면이 처음 로딩될 때, fetch()를 이용해서 TMDB에서 정보를 다 가지고오자!(이미 되어있음)
// 2. fetch로 가지고 온 결과물을 변수(전역변수 - 제일 바깥쪽)에 담자
// 3. 다음 두 가지로 나눠서 화면을 그려주는 함수 호출
// 3-1. 맨 처음 로딩될 때 : 별도의 필터링 없이 모든 리스트 출력
// 3-2. 버튼을 눌렀을 때 : 키워드에 해당되는 값만 필터링 해서 리스트 출력
