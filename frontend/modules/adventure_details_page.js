import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
let res=new URLSearchParams(search);
let finalRes=res.get("adventure");
console.log(finalRes);
return finalRes;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

try{
  let fetchData=await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
  let result=await fetchData.json();
  console.log(result);
  return result;
}
  // Place holder for functionality to work in the Stubs
  catch(err){
  return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let getName=document.getElementById("adventure-name");
  getName.innerHTML=adventure.name;

  let getSubTitle=document.getElementById("adventure-subtitle");
  getSubTitle.innerHTML=adventure.subtitle;

  adventure.images.map((image)=>{
    let ele=document.createElement("div");
    ele.className="col-lg-12";
    ele.innerHTML=`
    <img 
    src=${image}
    alt="Images"
    srcset=""
    class="activity-card-image pb-3 pb-md-0"
    />`;
    let gallery=document.getElementById("photo-gallery");
    gallery.append(ele);
  });

  document.getElementById("adventure-content").innerHTML=adventure.content;
  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
document.getElementById("photo-gallery").innerHTML=`
<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

`;

images.map((image,idx)=>{
  let ele=document.createElement("div");
  ele.className=`carousel-item ${idx===0?"active":""}`;
  ele.innerHTML=`
  <img 
  src=${image}
  alt="Images"
  srcset=""
  class="activity-card-image pb-3 pb-md-0"
  />`;

 let carouselInner=document.querySelector(".carousel-inner");
 carouselInner.append(ele);
});
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
if(adventure.available){

document.getElementById("reservation-panel-available").style.display="block";
document.getElementById("reservation-panel-sold-out").style.display="none";
document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;

}
else{
  document.getElementById("reservation-panel-available").style.display="none";
document.getElementById("reservation-panel-sold-out").style.display="block";

}


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons * adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

let form=document.getElementById("myForm");

form.addEventListener("submit",async(event)=>{
  event.preventDefault();

  let url=config.backendEndpoint + "/reservations/new";

  let formElements=form.elements;

  let bodyString=JSON.stringify({
    name: formElements["name"].value,
    date: formElements["date"].value,
    person: formElements["person"].value,
    adventure:adventure.id
  });

  try{
let res=await fetch (url,{
  method:"POST",
  body:bodyString,
  headers:{
    "content-Type":"application/json",
  },
});

if(res.ok){
  alert("Success !!");
  window.location.reload();
}
else{
  let data=await res.json();
  alert(`Failed ${data.message}`);
}

  }
  catch(err){
    alert("failed Fetch call resulted in an Error");
  }
  
});


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById("reserved-banner").style.display="block";
}
else {
  document.getElementById("reserved-banner").style.display="none";
}



}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
