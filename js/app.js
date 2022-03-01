const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message");
const phonesDiv = document.getElementById("phones");
errorMessage.style.display = "none";
// Load Data fro Api
const loadData = () => {
  phonesDiv.textContent = "";
  errorMessage.style.display = "none";
  let searchText = searchField.value;
  searchText = searchText.toLowerCase(); // search text make lower case
  if (searchText === "") {
    errorMessage.innerText =
      "Are you foolish!!! Please enter phone name or brand name";
    errorMessage.style.display = "block";
    console.log("Are you foolish!!! Please enter phone name or brand name");
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((respose) => respose.json())
      .then((document.getElementById("spinner").style.display = "block"))
      .then((data) => displayData(data.data))
      .catch((error) => displayError(error));
  }
};

// Display Phones
const displayData = (phones) => {
  if (phones.length === 0) {
    errorMessage.innerText = "Not Found. Please try with another keyword";
    errorMessage.style.display = "block";
    console.log("Not Found. Please try with anthoer keyword");
    document.getElementById("spinner").style.display = "none";
  } else {
    phonesDiv.textContent = "";
    for (const phone of phones) {
      const phoneCardDiv = document.createElement("div");
      phoneCardDiv.classList.add("col");
      phoneCardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto pt-2 " alt="" />
            <div class="card-body p-2">
              <h5 class="card-title text-center m-0">${phone.phone_name}</h5>
              <h6 class="card-title text-center m-0">${phone.brand}</h6>
            </div>
            <div class="card-footer bg-white text-center border-0">
              <button
                  onclick="loadPhoneDetails('${phone.slug}')"     class="btn btn-info">See Details
              </button>
            </div>
        </div>
      `;
      phonesDiv.appendChild(phoneCardDiv);
      // console.log(`Brand ${phone.brand}`);
      // console.log(`Name ${phone.phone_name}`);
      // console.log(`Photo ${phone.image}`);
      // console.log(`Id ${phone.slug}`);
    }
    // console.log(phones);
    document.getElementById("spinner").style.display = "none";
  }
};
// Error Message
const displayError = () => {
  errorMessage.style.display = "block";
  document.getElementById("spinner").style.display = "none";
};

// Load Phone Details
const loadPhoneDetails = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

// Display Phone Details
const displayPhoneDetails = (phone) => {
  const phoneDetails = document.getElementById("phone-details");
  const div = document.createElement("div");
  div.classList.add("row", "border-bottom", "border-top", "border-2");
  div.innerHTML = `
          <div class="col-2 col-lg-2"><h6>col-2</h6></div>
            <div class="col-10 col-lg-10 d-flex align-items-center">
              <span>${phone.name || "Not Found"}</span>
          </div>
  `;
  phoneDetails.appendChild(div);
  console.log(phone.name || "Not Found");
  console.log(phone?.releaseDate);
  console.log(phone.image);
  console.log(phone.brand);
  console.log(phone.mainFeatures?.storage);
  console.log(phone.mainFeatures.displaySize);
  console.log(phone.mainFeatures.chipSet);
  console.log(phone.mainFeatures?.memory);
  console.log(phone.mainFeatures?.sensors?.toString());
  console.log(phone?.others?.WLAN);
  console.log(phone?.others?.Bluetooth);
  console.log(phone?.others?.GPS);
  console.log(phone?.others?.NFC);
  console.log(phone?.others?.Radio);
  console.log(phone?.others?.USB);
};
