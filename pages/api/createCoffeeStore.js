const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log(table);

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="2"`,
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

        const createRecords = await table.create([
          {
            fields:{
              id:"3",
              name:"test2",
              address:"test2 address",
              neighbourhood:'test2 ne',
              voting: 2,
              imgUrl: ''
            }
          }
        ])
        
        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });

        res.json({message: 'create a record', records: records})
      }
    } catch (error) {
      console.log('Error finding store', error)
      res.staut(500).json({message: 'Error finding store', error})
    }
  } else {
    res.json({ message: 'Not GET' });
  }
};

export default createCoffeeStore;
