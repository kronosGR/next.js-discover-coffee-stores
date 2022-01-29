import { getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecords.length !== 0) {
        res.json(getMinifiedRecords(findCoffeeStoreRecords));
      } else {
        res.json({ message: `id ${id} could not be found` });
      }
      res.json({ message: `id is created ${id}` });
    } else {
      res.status(400).json({ message: 'Id is missing' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some went wrong ' + error });
  }
};

export default getCoffeeStoreById;
