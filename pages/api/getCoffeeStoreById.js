const getCoffeeStoreById = (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      res.json({ message: `id is created ${id}` });
    } else {
      res.status(400).json({ message: 'Id is missing' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some went wrong ' + error });
  }
};

export default getCoffeeStoreById;
