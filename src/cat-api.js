import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_IkvVMPAx2xKKtz9qpEURMEzicIabfSV6Esz8epHQrpBIrAtU4Ew4zQwj6xX6wfeF";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching the breeds: ", error);
  }
};

export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching the cat info: ", error);
  }
};
