import { getMinifiedRecords, table } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
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
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);

            res.json({ message: 'create a record', records: records });
          } else {
            res.status(400).json({ message: 'name is missing' });
          }
        }
      } else {
        res.status(400).json({ message: 'Id is missing' });
      }
    } catch (error) {
      console.log({ message: 'Error creating or finding store', error });
      res.staut(500).json({ message: 'Error creating or finding store', error });
    }
  } else {
    res.json({ message: 'Not GET' });
  }
};

export default createCoffeeStore;
