import { allMovies } from "./allMovies.js";
let url = `https://api.themoviedb.org/3/movie/popular?`
localStorage.setItem("url", url)
allMovies(url)