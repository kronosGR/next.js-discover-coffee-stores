import { fetchCoffeeStores } from '../../lib/coffee-stores';

const getCoffeeStoresByLocation = async (req, res) => {
  const { latLong, limit } = req.query;
  try {
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

export default getCoffeeStoresByLocation;
