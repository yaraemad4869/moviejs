fetching()
import { Functions } from "./functions.js"
Functions()
function fetching() {
    let watchlist = localStorage.getItem("watchlist")
    let obj = JSON.parse(watchlist)
    let row = document.querySelector(".row")
    row.innerHTML = ""
    // console.log(obj);
    for (const value in obj) {
        const ttle = obj[value].title.split(" ").slice(0, 4).join(" ")
        let ovrview = obj[value].overview.split("").slice(0, 57).join("") + "... "

        const card = document.createElement("div")
        row.appendChild(card)
        card.setAttribute("class", "card cardCol col-xs-12 col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6")
        card.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w185/${obj[value].poster_path}" class="card-img-top" alt = "${ttle} Poster" >
                        <div class="card-body">
                            <h5 class="card-title flex-nowrap">${ttle}</h5>
                            <p class="card-text flex-wrap"></p >
                            <div class="cardButtons">
                                <button class="btn btn-danger showDetails">Show Details</button>
                                <button class="btn btn-success addWachlist">Added</button>
                            </div>
                        </div > `


        let p = card.querySelector(".card-text")
        if (ovrview.length > 57) {
            p.innerText = ovrview
            p.innerHTML += `<a class="link">Show More</a>`
        }
        else {
            p.innerText = obj[value].overview
            p.innerHTML += `<a class="link"></a>`
        }
        p.addEventListener("click", () => {
            let a = card.querySelector(".link")
            if (ovrview == obj[value].overview && ovrview.length > 57) {
                ovrview = obj[value].overview.split("").slice(0, 57).join("") + "... "
                a.innerText = "Show More"
            }
            else if (ovrview = obj[value].overview.split("").slice(0, 57).join("") + "... " && ovrview.length > 57) {
                ovrview = obj[value].overview
                a.innerText = "Show Less"
            }
            else {
                a.innerText = "Show More"
                ovrview = obj[value].overview
            }
            p.innerText = ovrview
            p.innerHTML += `<a class= "link link-danger">${a.innerText}</a> `
        })

        let showDetails = card.querySelector(".showDetails")
        showDetails.addEventListener("click", () => {
            localStorage.setItem("id", obj[value].id)

            open(`../html/moviedetails.html`, "_self")
        })
        let addWachlist = card.querySelector(".addWachlist")
        addWachlist.addEventListener("click", () => {
            addWachlist.innerText = "Add to Watchlist"
            obj = JSON.parse(watchlist)
            console.log(obj[obj[value].id]);
            // obj[obj[value].id] = null
            // delete obj[obj[value].id]
            delete obj[obj[value].id]
            console.log(obj);
            watchlist = JSON.stringify(obj)
            localStorage.setItem("watchlist", watchlist)
            addWachlist.classList.remove("btn-success")
            addWachlist.classList.add("btn-danger")
            fetching()
        })

    }
}
