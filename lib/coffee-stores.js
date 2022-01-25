import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

async function getListOfCoffeeStorePhotos() {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40,
  });

  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls.small);
  return photosResponse;
}

export const fetchCoffeeStores = async (
  latLong = '43.65267326999575,-79.39545615725015', limit=6
) => {
  const photos = await getListOfCoffeeStorePhotos();

  const response = await fetch(getUrlForCoffeeStores(latLong, 'coffee stores', limit), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  });

  const data = await response.json();
  //console.log(data);
  return (
    data?.results?.map((venue, idx) => {
      // <------
      return {
        fsq_id: venue.fsq_id, // <------
        address: venue.location.address || '',
        name: venue.name,
        neighborhood: venue.location.neighborhood || venue.location.crossStreet || '',
        imgUrl: photos[idx],
      };
    }) || []
  );
};
