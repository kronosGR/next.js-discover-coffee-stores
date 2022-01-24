const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&client_id=B4M1I4L1QNP1WN2EBJXQFG5LT5Y50XHGINB4TTJLS3CW4FVH&client_secret=I20N5L3TDB3ZPPZ23KDDWKBHCBLBFF5GR4CFWRPKNXYTSPB1&limit=${limit}`;
};
export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores('43.65267326999575,-79.39545615725015', 'coffee stores', 6)
  );

  const data = await response.json();
  console.log(data);
  return data.response.venues;
};
