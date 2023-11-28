import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedsSelect = document.querySelector('.breed-select');
  const breeds = await fetchBreeds();

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedsSelect.appendChild(option);
  });

  breedsSelect.addEventListener('change', onBreedSelect);
});

function onBreedSelect(event) {
  const breedId = event.target.value;
  updateCatInfo(breedId);
}

async function updateCatInfo(breedId) {
  const catInfo = await fetchCatByBreed(breedId);
  // Тут код для оновлення інформації про кота в DOM
}
