function getLanguage(language) {
    let lang = document.querySelector(".lang")
    if (language == "en-US") {
        lang.innerText = "English"
    }
    else {
        lang.innerText = "العربية"
    }
    lang.addEventListener("click", () => {
        if (language == "en-US") {
            language = "ar-EG"
        }
        else {
            language = "en-US"
        }
        localStorage.setItem("lang", language)
        getLanguage(language)
    })
    let id = localStorage.getItem("id")
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU4Y2ZlZDUyYmVjZDMyYzk2YzhiMThhNjBlNTEwMSIsInN1YiI6IjY0ZjM3MzA0NzdkMjNiMDE1MDM5ZmNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8dzbLfiW4VmqFfX0Oilf1sw-3ICrqugy_sjyz2oGUI'
        }
    };
    let movieURL = `https://api.themoviedb.org/3/movie/${id}?language=${language}`
    fetching(movieURL, options)
}

import { Functions } from "./functions.js"
Functions()

let language = localStorage.getItem("lang")
if (language == null) {
    language = "en-US"
    localStorage.setItem("lang", language)
}
getLanguage(language)

function fetching(url, options) {
    fetch(url, options)
        .then((res) => res.json())
        .then((movie) => {
            let container = document.querySelector(".cont")
            container.innerHTML = ""
            console.log(movie);
            const card = document.createElement("div")
            container.appendChild(card)
            card.setAttribute("class", "card cardRow col-12")
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}" class="card-img-top col-4" alt = "${movie.title} Poster" >
                <div class="card-body">
                    <h5 class="card-title flex-nowrap">${movie.title}</h5>
                    <p class="card-text flex-wrap">${movie.overview}</p>
                    <h6>Rating : ${movie.vote_average}</h6>
                    <h6>Genres : ${movie.genres.map(value => value.name + " ")}</h6>
                    <button class="btn btn-danger addWatchlist"></button>
                </div>
            `;



            let watchlist = localStorage.getItem("watchlist")
            if (watchlist == null) {
                watchlist = {}
                watchlist = JSON.stringify(watchlist)
                localStorage.setItem("watchlist", watchlist)
            }
            let obj = JSON.parse(watchlist)
            console.log(obj);

            let addWatchlist = card.querySelector(".addWatchlist")
            let valueId = movie.id
            if (obj[valueId] != undefined) {
                addWatchlist.innerText = "Added"
                addWatchlist.classList.add("btn-success")
            }
            else {
                addWatchlist.innerText = "Add to Watchlist"
                addWatchlist.classList.add("btn-danger")
            }
            addWatchlist.addEventListener("click", () => {
                if (addWatchlist.innerText == "Add to Watchlist") {
                    addWatchlist.innerText = "Added"
                    obj = JSON.parse(watchlist)
                    obj[value.id] = value
                    watchlist = JSON.stringify(obj)
                    localStorage.setItem("watchlist", watchlist)
                    addWatchlist.classList.add("btn-success")
                    addWatchlist.classList.remove("btn-danger")
                    console.log(obj);
                }
                else {
                    addWatchlist.innerText = "Add to Watchlist"
                    obj = JSON.parse(watchlist)
                    obj[value.id] = null
                    delete obj[value.id]
                    watchlist = JSON.stringify(obj)
                    localStorage.setItem("watchlist", watchlist)
                    addWatchlist.classList.remove("btn-success")
                    addWatchlist.classList.add("btn-danger")
                    console.log(obj);
                }
            })
            container.innerHTML += `<h5>Production Companies : ${movie.production_companies.map(value => value.name + " ")}</h5>`
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU4Y2ZlZDUyYmVjZDMyYzk2YzhiMThhNjBlNTEwMSIsInN1YiI6IjY0ZjM3MzA0NzdkMjNiMDE1MDM5ZmNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8dzbLfiW4VmqFfX0Oilf1sw-3ICrqugy_sjyz2oGUI'
                }
            };
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, options)
                .then(res => res.json())
                .then(videos => {
                    videos.results.map(video => {
                        if (video.type = "Trailer") {
                            console.log(video);
                            container.innerHTML += `<h5>Production Companies : </h5>
                                <iframe src="https://www.youtube.com/watch?v=${video.key}"></iframe>
                            `

                        }
                    })


                })
        })
}
