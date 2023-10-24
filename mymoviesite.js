
let movieLists = []; // 맨 처음에 로딩될 때 가져온 영화 데이터를 담는 변수
const button = document.getElementById('search-button');
const input = document.getElementById('search-input');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTMxMTkzMzc4YTk5NDBjMmI0MTc0YzllODQ4ZDg0ZiIsInN1YiI6IjY1MmYyNTY5YTgwMjM2MDEzNzY4ODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESuIrOoB0i0HC3Br_KfTTrmIKFqSVxDhup_-ihC_zMs'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data=> {
  
    // 전역변수에 담자
    // 처음엔 전체 영화 출력
    
      movieLists = data.results;
      movieLists.forEach((result)=>{movieCard(result)});
    // 검색어가 들어온다면 검색한 단어를 포함하고 있는 영화만 출력
    // the => the godfather...
    // filterdMovie는 movieList에 키워드가 포함된 영화만 필터링된 배열이다.
 
  })  
  .catch(err => console.error(err));



// making movie card
function movieCard(movie){
  const title = movie['title'];
  const overview = movie['overview'];
  const posterPath = movie['poster_path'];
  const voteAverage = movie['vote_average'];
  const id = movie['id'];

  const card = document.createElement('div');
  const image = document.createElement('img');
  const titleHTML = document.createElement('h3');
  const overviewHTML = document.createElement('p');
  const voteAverageHTML = document.createElement('p');

  const moviecard = document.getElementById('movie_info');

  titleHTML.append(title);
  overviewHTML.append(overview);
  voteAverageHTML.append("Vote Average : "+voteAverage);
  image.src = `https://image.tmdb.org/t/p/w500${posterPath}`;

  moviecard.appendChild(card);
  card.appendChild(image);
  card.appendChild(titleHTML);
  card.appendChild(overviewHTML);
  card.appendChild(voteAverageHTML);

  // 카드 누르면 id 뜬다.
  card.addEventListener('click',(card)=>{
  alert(`ID : ${id}`);})
 
  }




function searchMovie(){
    function search(){
      const moviecard = document.getElementById('movie_info');
      moviecard.innerHTML=''; // 막혔던 부분 : 지웠다 실행해주면 해결 
      inputValue = input.value.toUpperCase();
      // let filteredMovies = movieLists.filter((movie)=>inputValue===movie.title.toUpperCase());
      let filteredMovies = movieLists.filter((movie)=>movie.title.toUpperCase().includes(inputValue));
      // 단어만 겹쳐도 검색이 가능하도록 만들기!
      // => includes 사용해서 성공
      filteredMovies.forEach((result)=>{movieCard(result)});
      console.log(filteredMovies.title);
    }
    // button.addEventListener('click',search); // 검색 버튼을 눌렀을 때 search
    input.addEventListener('keyup',search); // 키보드 검색과 동시에 search
} // 기존 것들을 지우고 찍어야 한다.
searchMovie();








  // onclick 여ㄴ결
  // 키워드에 맞게 갱신
  // 키워드 찾아내기
  // 검색 






  // 1. 화면이 처음 로딩될 때, fetch()를 이용해서 TMDB에서 정보를 다 가지고오자!(이미 되어있음)
  // 2. fetch로 가지고 온 결과물을 변수(전역변수 - 제일 바깥쪽)에 담자
  // 3. 다음 두 가지로 나눠서 화면을 그려주는 함수 호출
  // 3-1. 맨 처음 로딩될 때 : 별도의 필터링 없이 모든 리스트 출력
  // 3-2. 버튼을 눌렀을 때 : 키워드에 해당되는 값만 필터링 해서 리스트 출력