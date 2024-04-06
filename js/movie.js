import { Functions } from "./functions.js"
Functions()
let lang = document.querySelector(".lang")
let language = localStorage.getItem("lang")

if (language == null) {
    language = "en-US"
    localStorage.setItem("lang", language)
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
getLanguage(language)

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
}

let btns = document.querySelectorAll(".category")
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
        localStorage.setItem("Page", btns[i].innerText.toLowerCase())
        open(`../html/view.html`, "_self")
    })
}