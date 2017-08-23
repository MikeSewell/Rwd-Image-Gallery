// load page first
window.addEventListener("load", () => {
  const bigCat = document.querySelector(".blackCat")
  apiCall()
  bigCat.addEventListener("click", e => {
    const meow = new Audio("Angry-cat.mp3")
    bigCat.classList.toggle("move")
    setTimeout(() => {
      bigCat.classList.remove("move")
    }, 2500)
    meow.play()
  })
})

// Api call
function apiCall() {
  const searchString =
    "https://api.unsplash.com/search/photos/?query=cats&per_page=9&client_id=1382cda710cbbcf8082e24214cfd34d633a9572e3db9541f2a3219dfa0b47e6c"
  const xhr = new XMLHttpRequest()
  xhr.open("GET", searchString, true)
  xhr.onload = () => {
    const responseOject = JSON.parse(xhr.responseText)
    console.log(responseOject)
    console.log(responseOject.results[0].urls.raw)
    getImages(responseOject)
  }
  xhr.send(null)
}
// get the images and populate them
function getImages(a) {
  const imageList = document.querySelector(".imageList")
  a.results.forEach(element => {
    const { urls, user, likes } = element

    let imaUrl = urls.small
    let insert = `
      <li class="showCats">
      <img class="thisImage" src="${urls.small}" alt="Cute cat"
        srcset="${urls.small} 400w, ${urls.regular} 1080w, ${urls.full} 2560w"/>

        <div class="show">
            <div class="userName">
            <img src=${"./images/user-icon.svg"}>
            <p>${user.name}</p>
          </div>
          <div class="imgLikes">
            <img src=${"./images/heart.svg"}>
            <p>${likes}</p>
          </div>
        </div>
      </li>`

    imageList.insertAdjacentHTML("beforeend", insert)
  })
}
