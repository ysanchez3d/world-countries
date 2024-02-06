const region_api = "https://restcountries.com/v3.1/region";

const fetchRegion = async (region) => {
  const response = await fetch(`${region_api}/${region}`);
  const countries = await response.json();
  return countries;
};

const filterCountryInformation = (countries) => {
  return countries.map((country) => {
    return {
      name: country["name"]["common"],
      flag: country["flag"],
    };
  });
};

const regionsDiv = document.getElementsByClassName("regions")[0];
const regionSpan = document.getElementById("selected-country");
const countriesDiv = document.getElementById("countries");

regionsDiv.addEventListener("click", updateSelectedRegion);

const updateSelectedRegion = async (e) => {
  const region = e.target.parentNode.getAttribute("data-region");
  regionSpan.innerHTML = region.toUpperCase();

  const data = await fetchRegion(region);
  const countries = filterCountryInformation(data);
  updateCountriesUI(countries);
};

const updateCountriesUI = (countries) => {
  countriesDiv.innerHTML = "";
  const ul = document.createElement("ul");

  countries.forEach((country) => {
    const li = document.createElement("li");
    li.innerHTML = `${country.name} - ${country.flag}`;
    ul.append(li);
  });
  countriesDiv.appendChild(ul);
};
