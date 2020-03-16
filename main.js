const API_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '2722073f5fe5f2a3ecdee9d6af33c512';
const linkImg = "https://image.tmdb.org/t/p/w300/"
const linkRecomendationsFilm1 = "https://api.themoviedb.org/3/movie/";
const searchLink = "https://api.themoviedb.org/3/search/movie?api_key=2722073f5fe5f2a3ecdee9d6af33c512&query="
const linkRecomendationsFilm2 = "?api_key=";
let filmArray = [];
let filmArray2 = [];
let DeleteArr = [];
let DeleteArr2 = [];
let filmArraySarch2 = [];
let linkRecomendationCurrentId = [];
const fetchPopularFilms = fetch(`${API_URL}popular?api_key=${API_KEY}`);

const buttonClick = async () => {
  let input = document.getElementById('input')
  if (input.value == "") {
    document.body.innerHTML = `
     <div>
     <input value = ""id = "input"type="text"class="textArea" ></input>
      <button class="searchButton" onclick="buttonClick()">Search</button>
   </div>
   <div id="films">
   </div>
   <div id = "recomendations"></div>`
    await fetch(`${API_URL}popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => filmArray = [...filmArray, data.results]);
    var arrayFilms1 = document.getElementById('films');
    const list = document.createElement("ul");
    arrayFilms1.appendChild(list);

    for (i = 0; i < 20; i++) {
      const el = document.createElement("li");
      list.appendChild(el);
      el.setAttribute('id', i);
      el.setAttribute('onclick', "currentId(this.id)");
      el.innerText = filmArray[0][i].title;
      DeleteArr[i] = filmArray[0][i].genre_ids;
    }
  }
  else {
    document.body.innerHTML = "";
    document.body.innerHTML =

      `<div><input value = ""id = "input"type="text"class="textArea" ></input>` +
      `<button class="searchButton" onclick="buttonClick()">Search</button></div>`;
    let arrayFilms23232 = document.getElementById('body');
    const list = document.createElement("div");
    list.setAttribute('id', "films");
    arrayFilms23232.appendChild(list);
    var pustoiList = document.getElementById('films');
    if (pustoiList.innerHTML == null) {
      var pustoiList = document.getElementById('film');
      pustoiList.innerHTML = "";

    }
    pustoiList.innerHTML = "";
    filmArraySarch2 = [];
    for (let ii = 0; ii < 1; ii++) {

      await fetch(searchLink + input.value)
        .then(res => res.json())
        .then(data => filmArraySarch2 = [...filmArraySarch2, data.results]);
      arrayFilms = document.getElementById('films');
      const list = document.createElement("ul");
      arrayFilms.appendChild(list);
      for (i = 0; i < 20; i++) {
        const el = document.createElement("li");
        list.appendChild(el);
        el.setAttribute('id', i);
        el.setAttribute('onclick', "currentId2(this.id)");
        el.innerText = filmArraySarch2[0][i].title;
        DeleteArr2[i] = filmArraySarch2[0][i].genre_ids;
      }

    }

  }
}
function currentId2(id) {
  //створення інфочастини
  //id + 20;
  console.log(id); console.log();
  createInfoFilm(linkImg, filmArraySarch2[0][id].poster_path, filmArraySarch2[0][id].title, filmArraySarch2[0][id].overview)
  let el = document.createElement("input");
  el.setAttribute('value', "");
  createTitleRecomendationsFilm2(id);
}
function createInfoFilm(linkImg, filmArrayPoster_path, filmArrayTitle, filmArrayOverview) {
  document.body.innerHTML =

    `<div><input value = ""id = "input"type="text"class="textArea" ></input>` +
    `<button class="searchButton" onclick="buttonClick()">Search</button></div>` +
    `<div id="films"><div><img src = "${linkImg + filmArrayPoster_path}" class="image"  alt="logoImg"></div>` +
    `<h1>${filmArrayTitle}</h1>` +
    `<div class = "overview"><h4>${filmArrayOverview}</h4></div>` +
    `<div><h2>Recomendations :</h2></div></div >`;
}
function createInfoFilmForSearch(linkImg, filmArrayPoster_path, filmArrayTitle, filmArrayOverview) {
  document.body.innerHTML =
    `<div><input value = ""id = "input"type="text"class="textArea" ></input>` +
    `<button class="searchButton" onclick="buttonClick()"><-Back</button></div>` +
    `<div id="films"><div><img src = "${linkImg + filmArrayPoster_path}" class="image"  alt="logoImg"></div>` +
    `<h1>${filmArrayTitle}</h1>` +
    `<div class = "overview"><h4>${filmArrayOverview}</h4></div></div>`;
}
//сворюэм список
const createPopularList = async () => {
  await fetchPopularFilms
    .then(res => res.json())
    .then(data => filmArray = [...filmArray, data.results]);
  var arrayFilms = document.getElementById('films');
  const list = document.createElement("ul");
  arrayFilms.appendChild(list);
  for (i = 0; i < 20; i++) {
    const el = document.createElement("li");
    list.appendChild(el);
    el.setAttribute('id', i);
    el.setAttribute('onclick', "currentId(this.id)");
    el.innerText = filmArray[0][i].title;
    DeleteArr[i] = filmArray[0][i].genre_ids;
  }
};
//клік по ссилці
function currentId(id) {
  //створення інфочастини
  createInfoFilm(linkImg, filmArray[0][id].poster_path, filmArray[0][id].title, filmArray[0][id].overview)
  let el = document.createElement("input");
  el.setAttribute('value', "");
  createTitleRecomendationsFilm2(id);
}
//створюєм запрос і малюєм сторінкку при кліку на рекомендацію
function currentIdRecomendations(id) {
  fetch(linkRecomendationCurrentId[id])
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      createInfoFilm(linkImg, data.poster_path, data.title, data.overview);
    })
  createTitleRecomendationsFilm2(id);
  let el = document.createElement("input");
  el.setAttribute('value', "");
}
//створюэмо рекомендації
const createTitleRecomendationsFilm2 = async (id) => {
  for (let ii = 0; ii < DeleteArr[id].length; ii++) {
    let apiLinks1 = "https://api.themoviedb.org/3/movie/";
    let apiLinks2 = "?api_key=2722073f5fe5f2a3ecdee9d6af33c512"
    //збираэмо ссилки рекомендацый 
    linkRecomendationCurrentId[ii] = apiLinks1 + DeleteArr[id][ii] + apiLinks2;

    fetch(apiLinks1 + DeleteArr[id][ii] + apiLinks2)
      .then(function (resp) { return resp.json() })
      .then(function (data) {

        document.body.innerHTML += `<li id="${ii}" onclick = "currentIdRecomendations(this.id)" >${data.title}</li> `;
      })
  }

}
createPopularList();
