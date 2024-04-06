import { Functions } from "./functions.js"
export function allMovies(url) {

    Functions()
    window.addEventListener("load", () => {

        let language = localStorage.getItem("lang")
        if (language == null) {
            language = "en-US"
            localStorage.setItem("lang", language)
        }
        getLanguage(language)
    })
    let pageNumber = document.querySelector(".page-number")
    pageNumber.innerText = 1
    localStorage.setItem("PageNumber", pageNumber.innerText)
    let next = document.querySelector(".next")
    let previous = document.querySelector(".previous")
    next.addEventListener("click", () => {
        if (parseInt(pageNumber.innerText) < localStorage.getItem("totalPages")) {
            pageNumber.innerText = parseInt(pageNumber.innerText) + 1
            localStorage.setItem("PageNumber", pageNumber.innerText)
            changePage()
        }
        else {
            pageNumber.innerText = 1
            localStorage.setItem("PageNumber", pageNumber.innerText)
            changePage()
        }

    })
    previous.addEventListener("click", () => {
        if (parseInt(pageNumber.innerText) != 1) {
            pageNumber.innerText = parseInt(pageNumber.innerText) - 1
            localStorage.setItem("PageNumber", pageNumber.innerText)
            changePage()
        }
        else {
            pageNumber.innerText = localStorage.getItem("totalPages")
            localStorage.setItem("PageNumber", pageNumber.innerText)
            changePage()
        }

    })
    function changePage() {
        let pageNum = localStorage.getItem("PageNumber")
        let language = localStorage.getItem("lang")
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU4Y2ZlZDUyYmVjZDMyYzk2YzhiMThhNjBlNTEwMSIsInN1YiI6IjY0ZjM3MzA0NzdkMjNiMDE1MDM5ZmNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8dzbLfiW4VmqFfX0Oilf1sw-3ICrqugy_sjyz2oGUI'
            }
        };
        let movieURL = `${url}language=${language}&page=${pageNum}`
        fetching(movieURL, options)
    }



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
        let pageNum = localStorage.getItem("PageNumber")
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTU4Y2ZlZDUyYmVjZDMyYzk2YzhiMThhNjBlNTEwMSIsInN1YiI6IjY0ZjM3MzA0NzdkMjNiMDE1MDM5ZmNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m8dzbLfiW4VmqFfX0Oilf1sw-3ICrqugy_sjyz2oGUI'
            }
        };
        let movieURL = `${url}language=${language}&page=${pageNum}`
        fetching(movieURL, options)
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
                console.log(obj);
                localStorage.setItem("totalPages", allMovies.total_pages)
                let row = document.querySelector(".row")
                row.innerHTML = ""
                allMovies.results.map((value) => {

                    let ttle = value.title.split(" ").slice(0, 4).join(" ")
                    let ovrview = value.overview.split("").slice(0, 57).join("") + "... "

                    const card = document.createElement("div")
                    row.appendChild(card)
                    card.setAttribute("class", "card cardCol col-xs-12 col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6")
                    card.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w185/${value.poster_path}" class="card-img-top" alt = "${ttle} Poster" >
                        <div class="card-body">
                            <h5 class="card-title flex-nowrap">${ttle}</h5>
                            <p class="card-text flex-wrap"></p >
                            <div class="cardButtons">
                                <button class="btn btn-danger showDetails">Show Details</button>
                                <button class="btn addWachlist"></button>
                            </div>
                        </div > `


                    let p = card.querySelector(".card-text")
                    if (ovrview.length > 57) {
                        p.innerText = ovrview
                        p.innerHTML += `<a class="link">Show More</a>`
                    }
                    else {
                        p.innerText = value.overview
                        p.innerHTML += `<a class="link"></a>`
                    }
                    p.addEventListener("click", () => {
                        let a = card.querySelector(".link")
                        if (ovrview == value.overview && ovrview.length > 57) {
                            ovrview = value.overview.split("").slice(0, 57).join("") + "... "
                            a.innerText = "Show More"
                        }
                        else if (ovrview = value.overview.split("").slice(0, 57).join("") + "... " && ovrview.length > 57) {
                            ovrview = value.overview
                            a.innerText = "Show Less"
                        }
                        else {
                            a.innerText = "Show More"
                            ovrview = value.overview
                        }
                        p.innerText = ovrview
                        p.innerHTML += `<a class= "link link-danger">${a.innerText}</a> `
                    })

                    let showDetails = card.querySelector(".showDetails")
                    showDetails.addEventListener("click", () => {
                        localStorage.setItem("id", value.id)

                        open(`../html/moviedetails.html`, "_self")
                    })


                    let addWachlist = card.querySelector(".addWachlist")
                    let valueId = value.id
                    if (obj[valueId] != undefined) {
                        addWachlist.innerText = "Added"
                        addWachlist.classList.add("btn-success")
                    }
                    else {
                        addWachlist.innerText = "Add to Watchlist"
                        addWachlist.classList.add("btn-danger")
                    }


                    addWachlist.addEventListener("click", () => {
                        if (addWachlist.innerText == "Add to Watchlist") {
                            addWachlist.innerText = "Added"
                            obj = JSON.parse(watchlist)
                            obj[value.id] = value
                            watchlist = JSON.stringify(obj)
                            localStorage.setItem("watchlist", watchlist)
                            addWachlist.classList.add("btn-success")
                            addWachlist.classList.remove("btn-danger")
                            console.log(obj);
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
                            console.log(obj);
                        }
                    })
                })
            })
    }
}