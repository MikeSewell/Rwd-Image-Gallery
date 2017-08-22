// load page first
window.addEventListener("load", () => {
  // getImages()
  apiCall()
})

// Api call
function apiCall() {
  const searchString =
    "https://api.unsplash.com/search/photos/?query=cats&client_id=1382cda710cbbcf8082e24214cfd34d633a9572e3db9541f2a3219dfa0b47e6c"
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

function getImages(a) {
  const imageList = document.querySelector(".imageList")
  a.results.forEach(element => {
    const { urls, user, likes } = element
    console.log(urls.small)
    console.log(urls.full)
    let imaUrl = urls.small
    let insert = `
      <li>
      <img class="thisImage" src="${urls.small}" alt="Cute cat"
        srcset="${urls.small} 200w, ${urls.regular} 400w, ${urls.full} 1080w"/>

        <div class="back">
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
