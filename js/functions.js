export function Functions() {

    function getMode(b) {
        let style = document.querySelector("style")
        if (b == "true" || b == true) {
            // background-image: linear-gradient(to left, #ffb4b4, rgb(215 0 0));
            style.innerText = `
            body {
                background-image: linear-gradient(to right, black, rgb(116, 0, 0));
                color: white;
            }
            .card {
                color: white;
                background-color: black;
                border: 0.5px white solid;
            }
            .page-number{
                color:white;
            }
        `
        }
        else {
            style.innerText = `
            body {
                background-image:linear-gradient(to right,rgb(199, 199, 199),white);
                color: black;
            }
            .card {
                color: black;
                background-color: white;
                border: 0.5px black solid;
            }
            .page-number{
                color:black;
            }
        `
        }
        let mode = document.querySelector(".mode")
        mode.addEventListener("click", () => {
            if (b == "true" || b == true) {
                b = false
            }
            else {
                b = true
            }
            localStorage.setItem("mode", b)
            getMode(b)
        })
    }
    function darkMode() {
        let dark = localStorage.getItem("mode")
        if (dark == null) {
            dark = false
            localStorage.setItem("mode", dark)
            let mode = document.querySelector(".mode")
            mode.addEventListener("click", () => {
                if (dark == true || dark == "true") {
                    dark = false
                }
                else {
                    dark = true
                }
                localStorage.setItem("mode", dark)
            })
        }
        getMode(dark)
    }
    darkMode()
}
