const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

console.log(table);

const createCoffeeStore = async (req, res) => {
  if (req.method === 'POST') {
    const findCoffeeStoreRecords = await table
      .select({
        filterByFormula: `id="0"`,
      })
      .firstPage();

    if (findCoffeeStoreRecords.length!==0) {
      res.json(findCoffeeStoreRecords);
    }
    else {

    }
  } else {
    res.json({ message: 'Not GET' });
  }
};

export default createCoffeeStore;
