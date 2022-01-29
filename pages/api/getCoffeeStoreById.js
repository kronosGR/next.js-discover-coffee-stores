import { findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = findRecordByFilter(id);

      if (records.length !== 0) {
        res.json(records);
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
