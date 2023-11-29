import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_IkvVMPAx2xKKtz9qpEURMEzicIabfSV6Esz8epHQrpBIrAtU4Ew4zQwj6xX6wfeF";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error("Error fetching breeds: ", error);
    throw error;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cat by breed: ", error);
    throw error;
  }
}
error.hidden = true; 
async function init() {
  try {
    loader.hidden = false;
    const breeds = await fetchBreeds();
    loader.hidden = true;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error(err);
    loader.hidden = true;
    error.textContent = 'Failed to load breeds';
    error.hidden = false;
  }
}

breedSelect.addEventListener('change', async (e) => {
  try {
    loader.hidden = false;
    const breedId = e.target.value;
    const catData = await fetchCatByBreed(breedId);
    updateCatInfo(catData[0]);
    loader.hidden = true;
  } catch (err) {
    console.error(err);
    loader.hidden = true;
    error.textContent = 'Failed to load cat data';
    error.hidden = false;
  }
});

function updateCatInfo(catData) {
  if (!catData) {
    catInfoDiv.innerHTML = '<p>No data available</p>';
    return;
  }

  const { url, breeds: [breed] } = catData;
  const catInfoMarkup = `
    <img src="${url}" alt="Breed: ${breed.name}">
    <p><strong>Breed:</strong> ${breed.name}</p>
    <p><strong>Description:</strong> ${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
  `;

  catInfoDiv.innerHTML = catInfoMarkup;
}

init();
