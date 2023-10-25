//해당하는 영화 id를 가져옴
const movieDetail = document.querySelector('.movie__detail');
const movies = JSON.parse(localStorage.getItem('movie'));
const id = localStorage.getItem('clickedID');


function getDetail() {
    let { original_title, title, poster_path, vote_average, overview } = movies.find(movie => movie.id == id);
    poster_path = `https://image.tmdb.org/t/p/original/${poster_path}`;
    const detail__left = document.createElement('div');
    const movieMiniTitle = document.createElement('h3');
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

    detail__left.appendChild(movieMiniTitle);
    detail__left.appendChild(movieTitle);
    detail__left.appendChild(stars);

    const score = document.createElement('span');
    score.setAttribute('class', 'average');
    score.innerHTML = `⭐평점 : ${vote_average}`;

    const content = document.createElement('p');
    content.setAttribute('class', 'overview')
    content.textContent = overview;

    const detail__right = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', poster_path);
    img.setAttribute('width', "268");
    img.setAttribute('height', "382");
    detail__right.appendChild(img);

    movieDetail.appendChild(detail__left);
    movieDetail.appendChild(movieMiniTitle);
    movieDetail.appendChild(movieTitle);
    movieDetail.appendChild(content);
    movieDetail.appendChild(score);
    movieDetail.appendChild(img);
}

window.addEventListener('load', getDetail);