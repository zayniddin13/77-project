import { ref, onMounted, watch } from "vue";

export const fetchDataFromApi = async (a) => {
  console.log(locale._value);
  let deviceId = localStorage.getItem("deviseId");
  if (!deviceId) {
    deviceId = Math.floor(Math.random() * 10000000000000000);
    localStorage.setItem("deviseId", deviceId);
  }
  try {
    loading.value = true;
    const response = await a.get(`/list/ads/?page_size=8`, {
      headers: {
        "Device-Id": deviceId,
        "Accept-Language": locale._value,
      },
    });

    let data= response.data.results;
    console.log(response.data.results);
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
      console.log(loading.value);
    }, 500);
  }
    return data;
};