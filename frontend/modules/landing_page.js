import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  console.log("From Init()");
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  let data=await fetch(`${config.backendEndpoint}/cities`);
  data=await data.json();
  console.log(data);
  return data;
}
catch(err){
  return null;
}

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM


let rowDiv=document.getElementById("data");
let colDiv=document.createElement("div");
colDiv.className = "col-6 col-sm-6 col-lg-3 col-md-4 mb-4"
let tileDiv=document.createElement("div");
tileDiv.className="tile";

//Anchor Tag//

let anchorDiv=document.createElement("a");
anchorDiv.setAttribute("href" , `pages/adventures/?city=${id}`)
anchorDiv.setAttribute("id" , `${id}`)

//get Images//

let imageDiv=document.createElement("img");

imageDiv.setAttribute("src" , `${image}`);

//appending here//

anchorDiv.appendChild(imageDiv);

tileDiv.append(anchorDiv);

colDiv.append(tileDiv);

let textDiv = document.createElement("div");
textDiv.className = "tile-text"

textDiv.innerHTML =`
<h5 class="text-center">${city}</h5>
<h6 class="text-center">${description}</h6>
`
tileDiv.append(textDiv)
colDiv.append(tileDiv)
rowDiv.append(colDiv)

}

export { init, fetchCities, addCityToDOM };

