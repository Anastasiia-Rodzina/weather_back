import City from "../../models/cities.js";

const addCity = async (req, res) => {
  const { title } = req.body;
  const { _id } = req.user;
  const result = await City.create({
    title,
    assignees: [_id],
  });

  res.status(201).json(result);
};

export default addCity;
