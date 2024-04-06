import { allMovies } from "./allMovies.js";
let url = `https://api.themoviedb.org/3/trending/movie/day?`
localStorage.setItem("url", url)
allMovies(url)