import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common["x-api-key"] = "live_IkvVMPAx2xKKtz9qpEURMEzicIabfSV6Esz8epHQrpBIrAtU4Ew4zQwj6xX6wfeF";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

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
    if (catData.length > 0) {
      updateCatInfo(catData[0]);
    }
    loader.hidden = true;
  } catch (err) {
    console.error(err);
    loader.hidden = true;
    error.textContent = 'Failed to load cat data';
    error.hidden = false;
  }
});

function updateCatInfo(catData) {
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
