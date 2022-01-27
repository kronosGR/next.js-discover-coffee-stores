const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base ("coffee-stores")

console.log(table)

const createCoffeeStore = (req, res)=> {

  if(req.method === 'POST'){
    res.json({message:'ssss'})
  } else {    
    res.json({message:'Not GET'})
  }
}

export default createCoffeeStore