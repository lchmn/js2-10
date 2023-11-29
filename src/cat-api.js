import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_IkvVMPAx2xKKtz9qpEURMEzicIabfSV6Esz8epHQrpBIrAtU4Ew4zQwj6xX6wfeF";

// Функція для отримання списку усіх порід
export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data; // Повертаємо масив порід
  } catch (error) {
    console.error("Error fetching breeds: ", error);
    throw error; // Передаємо помилку вгору, щоб можна було її обробити
  }
}

// Функція для отримання інформації про породу за ID
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const data = response.data;
    console.log(data); // Додаємо лог для перевірки даних
    return data[0]; // Зверніть увагу, що data - це масив, тому повертаємо перший елемент
  } catch (error) {
    console.error("Error fetching cat by breed: ", error);
    throw error; // Передаємо помилку вгору
  }
}


