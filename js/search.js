import { Functions } from "./functions.js"
Functions()
let language = localStorage.getItem("lang")

if (language == null) {
    language = "en-US"
    localStorage.setItem("lang", language)
}
getLanguage(language)


function getLanguage(language) {
    let url = localStorage.getItem("url")
    let movieURL = `${url}language=${language}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU4Y2ZlZDUyYmVjZDMyYzk2YzhiMThhNjBlNTEwMSIsInN1YiI6IjY0ZjM3MzA0NzdkMjNiMDE1MDM5ZmNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8dzbLfiW4VmqFfX0Oilf1sw-3ICrqugy_sjyz2oGUI'
        }
    };
    fetching(movieURL, options)
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
}

function fetching(url, options) {
    fetch(url, options)
        .then((res) => res.json())
        .then((allMovies) => {
            let watchlist = localStorage.getItem("watchlist")
            if (watchlist == null) {
                watchlist = {}
                watchlist = JSON.stringify(watchlist)
                localStorage.setItem("watchlist", watchlist)
            }
            let obj = JSON.parse(watchlist)
            localStorage.setItem("totalPages", allMovies.total_pages)
            console.log(allMovies.results);
            let search = document.querySelector(".search")
            let showDiv = document.querySelector(".showDiv")
            search.addEventListener("input", () => {
                showDiv.innerText = ""
                allMovies.results.map((value) => {
                    if (search.value != "" && value.title.toLowerCase().includes(search.value.toLowerCase())) {
                        let ttle = value.title.split(" ").slice(0, 4).join(" ")
                        let ovrview = value.overview.split("").slice(0, 60).join("") + "... "

                        const card = document.createElement("div")
                        showDiv.appendChild(card)
                        card.setAttribute("class", "card cardCol col-xs-12 col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6")
                        card.innerHTML = `
                                <img src="https://image.tmdb.org/t/p/w185/${value.poster_path}" class="card-img-top" alt = "Movie Poster" >
                                <div class="card-body">
                                    <h5 class="card-title flex-nowrap">${ttle}</h5>
                                    <p class="card-text flex-wrap">${ovrview}<a class="link link-danger">Show More</a></p>
                                    <div class="cardButtons">
                                    <button class="btn btn-danger showDetails">Show Details</button>
                                    <button class="btn btn-danger addWachlist">Add to Watchlist</button>
                                    </div>
                                </div>`

                        let a = card.querySelector(".link")
                        let p = card.querySelector(".card-text")
                        p.addEventListener("click", () => {
                            if (ovrview == value.overview) {
                                ovrview = value.overview.split("").slice(0, 60).join("") + "... "
                                a.innerText = "Show Less"
                            }
                            else {
                                a.innerText = "Show More"
                                ovrview = value.overview
                            }
                            p.innerText = ovrview + " "
                            p.innerHTML += `<a class="link link-danger">${a.innerText}</a>`
                        })

                        let showDetails = card.querySelector(".showDetails")
                        showDetails.addEventListener("click", () => {
                            localStorage.setItem("id", value.id)

                            open(`../html/moviedetails.html`, "_self")
                        })

                        let addWachlist = card.querySelector(".addWachlist")
                        addWachlist.addEventListener("click", () => {
                            if (addWachlist.innerText == "Add to Watchlist") {
                                addWachlist.innerText = "Added"
                                obj = JSON.parse(watchlist)
                                obj[value.id] = value
                                watchlist = JSON.stringify(obj)
                                localStorage.setItem("watchlist", watchlist)
                                addWachlist.classList.add("btn-success")
                                addWachlist.classList.remove("btn-danger")
                            }
                            else {
                                addWachlist.innerText = "Add to Watchlist"
                                obj = JSON.parse(watchlist)
                                obj[value.id] = null
                                delete obj[value.id]
                                watchlist = JSON.stringify(obj)
                                localStorage.setItem("watchlist", watchlist)
                                addWachlist.classList.remove("btn-success")
                                addWachlist.classList.add("btn-danger")
                            }
                        })
                    }

                })
            })
        })
}

