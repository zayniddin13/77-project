<script setup>
import { reverseGeocodingInstance, authInstance } from "@/instances";
import { watch } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  userDetailsSignUp: Object,
});
const emit = defineEmits([
  "close:modal",
  "success:signUpDone",
  "update:goBack",
]);

const map = ref();
const marker = ref();
const coords = ref({ lat: 0, lng: 0 });
const searchPlacesResults = ref([]);
const searchTerm = ref("");

function createDebounce() {
  let timeout;
  return function (fnc, delayMs) {
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        if (fnc) await fnc();
        resolve();
      }, delayMs || 500);
    });
  };
}

const debounce = ref(createDebounce());

onMounted(() => {
  map.value = leaflet.map("map");

  map.value.setView([41.32503151466505, 69.24269508726519], 15);

  leaflet
    .tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    })
    .addTo(map.value);

  const customMarker = leaflet
    .marker([41.32503151466505, 69.24269508726519], { draggable: true })
    .addTo(map.value);

  customMarker.addEventListener("dragend", () => {
    const c = customMarker.getLatLng();

    coords.value.lat = c.lat;
    coords.value.lng = c.lng;
  });

  marker.value = customMarker;
});

async function searchPlaces() {
  try {
    const response = await reverseGeocodingInstance.get(
      `/search?q=${searchTerm.value}&addressdetails=1&format=json`
    );

    searchPlacesResults.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

watch(
  () => coords.value,
  async (newOne, oldOne) => {
    try {
      const response = await reverseGeocodingInstance.get(
        `/reverse?lat=${newOne.lat}&lon=${newOne.lng}&format=json`
      );

      props.userDetailsSignUp.address.name = response.data.display_name;
      props.userDetailsSignUp.address.lat = newOne.lat;
      props.userDetailsSignUp.address.long = newOne.lng;
    } catch (error) {
      console.log(error);
    }
  },
  { deep: true }
);

async function moveMarkerToThePlace(c) {
  map.value.setView([c.lat, c.lng], 17);
  marker.value.setLatLng([c.lat, c.lng]);
  searchPlacesResults.value = [];
}

async function signUp() {
  try {
    const response = await authInstance.post("/seller/registration/", {
      ...props.userDetailsSignUp,
    });

    if (!response) {
      throw new Error("Internet bilan aloqa mavjud emas");
    }

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    if (response.status === 201) {
      emit("success:signUpDone");
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div
    class="relative overflow-x-hidden scroll-style p-4 bg-white w-full lg:max-w-sm shadow-xl overflow-y-auto rounded-2xl map-box h-[400px] min-h-[650px]"
  >
    <div class="flex titles">
      <div class="flex items-center gap-3 left">
        <button
          @click="emit('update:goBack')"
          class="text-[10px] rotate-90 icon-down back"
        ></button>
        <h1 class="text-2xl font-bold title">Введите адресс</h1>
      </div>
      <button
        @click="emit('close:modal')"
        class="absolute text-2xl font-bold icon-cancle right top-4 right-4"
      ></button>
    </div>
    <h1 class="pb-3 mt-5 text-base font-medium leading-5 text-gray-1">
      Lokatsiya
    </h1>
    <div class="relative search-bar">
      <input
        v-model="searchTerm"
        @input="debounce(async () => await searchPlaces(), 1000)"
        type="text"
        placeholder="Введите адрес"
        class="w-full px-4 py-3 mb-4 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue ps-4 pe-10 sm:text-sm text-dark bg-gray-2"
      />
      <div
        v-show="searchPlacesResults.length"
        class="results absolute top-10 z-[99] w-full shadow-lg max-h-[140px] overflow-y-scroll overflow-x-hidden"
      >
        <button
          v-for="place in searchPlacesResults"
          :key="place.place_id"
          class="text-left font-semibold transition text-ellipsis whitespace-nowrap overflow-hidden hover:text-blue result bg-white px-4 py-2 z-[99] w-full border-t"
          @click="moveMarkerToThePlace({ lat: +place.lat, lng: +place.lon })"
        >
          {{ place.display_name }}
        </button>
      </div>
    </div>
    <div class="z-50 map" id="map"></div>
    <button
      @click="signUp"
      class="mt-4 bg-blue text-white hover:bg-blue-1 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg transition-300 active:scale-95 disabled:text-gray-2 w-full sign-up-action"
    >
      Подать заявку
    </button>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 65%;
}
</style>
