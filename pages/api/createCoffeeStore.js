const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log(table);

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
          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });
          res.json(records);
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

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });

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
