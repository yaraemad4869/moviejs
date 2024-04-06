import { allMovies } from "./allMovies.js";
let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&`
localStorage.setItem("url", url)
allMovies(url)