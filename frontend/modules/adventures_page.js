
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it


const searchParams=new URLSearchParams(search);
let searchTerm=searchParams.get("city");
// console.log(searchTerm);

return searchTerm;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try{
    let res=await fetch(config.backendEndpoint+"/adventures?city="+city);
    let finalRes=await res.json();
    console.log(finalRes);
    return finalRes;
  }


  catch(err){
    return null;
  }


}

// Implementation of DOM manipulation to add adventures for the given city from the list of adventures
function addAdventureToDOM(adventures) {
  const adventureContainer = document.getElementById("data");

  adventures.forEach((element) => {
    // Create a card div for each adventure
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-6 col-sm-6 col-lg-3 col-md-4 mb-4"; // Apply the appropriate classes
  
    
  
    // Create a link to the adventure details page
    const adventureLink = document.createElement("a");
    adventureLink.href = `detail/?adventure=${element.id}`;
    adventureLink.id = `${element.id}`
  
    const actDiv = document.createElement("div");
    actDiv.className = "activity-card"
  
    
    
    // Create an image element for the adventure card
    const image = document.createElement("img");
    image.src = element.image;
    image.alt = element.name;
   // image.className = "activity-card img"; // Apply the appropriate class
  
   actDiv.append(image);
  
   const costPerHead = document.createElement("div");
   costPerHead.className = "d-flex px-3 w-100 justify-content-between mt-2"
   
   costPerHead.innerHTML = `
   <h6>${element.name}</h6>
   <h6>₹${element.costPerHead}</h6>
   `
  
   actDiv.append(costPerHead)
    
    const duration = document.createElement("div");
    duration.className = "d-flex px-3 w-100 justify-content-between mt-2";
  
    duration.innerHTML =`
    <h6>Duration</h6>
         <h6>${element.duration} Hours</h6>
    `
  actDiv.append(duration)
  
    // Create a banner for the category
    const categoryBanner = document.createElement("div");
    categoryBanner.className = "category-banner";
    categoryBanner.textContent = element.category;
  
    // Create other elements for the adventure card (name, cost, duration)
    // const adventureName = document.createElement("h2");
    // adventureName.textContent = element.name;
    
   actDiv.append(categoryBanner)
   adventureLink.append(actDiv)
  
    cardDiv.append(adventureLink)
    // Append the adventure card to the container
    adventureContainer.appendChild(cardDiv);
  });
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

let filteredList=list.filter((adventure)=>adventure.duration>low && adventure.duration<= high);

return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
let filteredList=[];

categoryList.forEach((category)=>{
list.forEach((key)=>{
if(key.category===category){
  filteredList.push(key);
}
})


})
return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
//4 . None Selected

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
let filteredList=[];

if(filters["duration"].length>0 && filters["category"].length >0){

let choice=filters["duration"].split("-");

filteredList=filterByDuration(
  list,parseInt(choice[0]),parseInt(choice[1])
);

filteredList=filterByCategory(filteredList,filters["category"]);

}
else if (filters["duration"].length>0){

  let choice=filters["duration"].split("-");

  filteredList=filterByDuration(
    list,parseInt(choice[0]),parseInt(choice[1])
  );
  
}

else if (filters["category"].length>0){
  filteredList=filterByCategory(list,filters["category"]);


}
else{
filteredList=list;

}

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
return JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value 
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills


document.getElementById("duration-select").value=filters.duration;

filters["category"].forEach((key)=>{
let div=document.createElement("div");
div.className="category-filter";

div.innerHTML=`<div>${key}</div>`;

document.getElementById("category-list").append(div);


})






}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
