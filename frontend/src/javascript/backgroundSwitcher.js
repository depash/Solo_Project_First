window.addEventListener('DOMContentLoaded', (e) => {
    const background = document.getElementById("background")
    const src = ["./images/1582050035728.jpg", "./images/colorful-landscape-photography-1002.jpg", "./images/Dan-Ballard-Landscapes-6.jpg", "./images/koJs46qPG4rPsL6KohQac3.jpg", "./images/Landscape-Tips-Mike-Mezeul-II.jpg"]
    let curImg = Math.floor(Math.random() * 5)

    const setNewImage = () => {
        background.style.backgroundImage = `url(${src[curImg]})`
        console.log("switch")
    }
    setInterval(setNewImage, 8000)
})
