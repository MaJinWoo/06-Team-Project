const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTMxMTkzMzc4YTk5NDBjMmI0MTc0YzllODQ4ZDg0ZiIsInN1YiI6IjY1MmYyNTY5YTgwMjM2MDEzNzY4ODc3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ESuIrOoB0i0HC3Br_KfTTrmIKFqSVxDhup_-ihC_zMs",
    },
};

const url = "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";
async function fetchMovies() {
    const result = await fetch(url, options)
        .then((response) => response.json())
        .then((data) => data.results)
        .catch((err) => console.error(err));

    return result;
}


export { fetchMovies }