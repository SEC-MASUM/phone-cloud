const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message");
const phonesDiv = document.getElementById("phones");
const phoneDetails = document.getElementById("phone-details");
const showMoreButton = document.getElementById("show-more-button");
errorMessage.style.display = "none";
// Load Data from Api
const loadData = () => {
  phoneDetails.textContent = "";
  phoneDetails.style.display = "none";

  phonesDiv.textContent = "";
  errorMessage.style.display = "none";
  showMoreButton.style.display = "none";
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
  console.log(phones);
  if (phones.length === 0) {
    errorMessage.innerText = "Not Found. Please try with another keyword";
    errorMessage.style.display = "block";
    // console.log("Not Found. Please try with anthoer keyword");
    document.getElementById("spinner").style.display = "none";
  } else if (phones.length <= 20) {
    createPhoneCard(phones, 0, phones.length);
  } else if (phones.length > 20) {
    createPhoneCard(phones, 0, 20);
    // Create Show More Button
    document.getElementById("spinner").style.display = "none";
    showMoreButton.innerHTML = `
          <button
            onclick="displayMorePhones('${searchField.value}')"
            type="button"
            class="btn btn-primary py-2 px-4 fs-5"
          >
            Show More
          </button>
    `;
    showMoreButton.style.display = "block";
  }
};

const displayMorePhones = (searchText) => {
  // console.log(searchText);
  showMoreButton.style.display = "none";
  document.getElementById("spinner").style.display = "block";
  searchText = searchText.toLowerCase(); // search text make lower case

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((respose) => respose.json())
    .then((data) => createPhoneCard(data.data, 20, data.data.length))
    .catch((error) => displayError(error));
};

// Error Message
const displayError = () => {
  errorMessage.style.display = "block";
  document.getElementById("spinner").style.display = "none";
};

// Create Phone Card
const createPhoneCard = (phone, start, end) => {
  for (let i = start; i < end; i++) {
    const phoneCardDiv = document.createElement("div");
    phoneCardDiv.classList.add("col");
    phoneCardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone[i].image}" class="card-img-top w-50 mx-auto pt-2 " alt="" />
            <div class="card-body p-2">
              <h5 class="card-title text-center m-0">${phone[i].phone_name}</h5>
              <h6 class="card-title text-center m-0">${phone[i].brand}</h6>
            </div>
            <div class="card-footer bg-white text-center border-0">
              <button
                  onclick="loadPhoneDetails('${phone[i].slug}')"     class="btn btn-info">See Details
              </button>
            </div>
        </div>
      `;
    phonesDiv.appendChild(phoneCardDiv);
  }
  document.getElementById("spinner").style.display = "none";
};

// Load Phone Details
const loadPhoneDetails = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

// Display Phone Details
const displayPhoneDetails = (phone) => {
  phoneDetails.style.display = "block";
  phoneDetails.innerHTML = `
          <div>
            <img src="${phone.image}" />
          </div>
          <div>
            <table class="table table-striped table-hover">
              <tbody>
                <tr class="row border-top">
                  <th scope="row" class="col-3 col-lg-2">Name</th>
                  <td class="col-9 col-lg-10">${phone.name}</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Release Data</th>
                  <td class="col-9 col-lg-10">${
                    phone?.releaseDate || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Brand</th>
                  <td class="col-9 col-lg-10">${
                    phone.brand || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" colspan="2" class="table-active table-dark text-center">Main Features</th>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Display Size</th>
                  <td class="col-9 col-lg-10">${
                    phone.mainFeatures.displaySize || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Chipset</th>
                  <td class="col-9 col-lg-10">${
                    phone.mainFeatures.chipSet || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Memory</th>
                  <td class="col-9 col-lg-10">${
                    phone.mainFeatures.memory || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Storage</th>
                  <td class="col-9 col-lg-10">${
                    phone.mainFeatures.storage || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Sensors</th>
                  <td class="col-9 col-lg-10">${
                    phone.mainFeatures?.sensors?.join(", ") || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" colspan="2" class="table-active table-dark text-center">Others</th>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">WLAN</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.WLAN || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Bluetooth</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.Bluetooth || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">GPS</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.GPS || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">NFC</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.NFC || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">Radio</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.Radio || "No data found"
                  }</td>
                </tr>
                <tr class="row">
                  <th scope="row" class="col-3 col-lg-2">USB</th>
                  <td class="col-9 col-lg-10">${
                    phone?.others?.USB || "No data found"
                  }</td>
                </tr>
              </tbody>
            </table>
          </div>
  `;
};

/* console.log(phone.name || "Not Found");
  console.log(phone?.releaseDate);
  console.log(phone.image);
  console.log(phone.brand);
  console.log(phone.mainFeatures?.storage);
  console.log(phone.mainFeatures.displaySize);
  console.log(phone.mainFeatures.chipSet);
  console.log(phone.mainFeatures?.memory);
  console.log(phone.mainFeatures?.sensors?.join(", "));
  console.log(phone?.others?.WLAN);
  console.log(phone?.others?.Bluetooth);
  console.log(phone?.others?.GPS);
  console.log(phone?.others?.NFC);
  console.log(phone?.others?.Radio);
  console.log(phone?.others?.USB); */
