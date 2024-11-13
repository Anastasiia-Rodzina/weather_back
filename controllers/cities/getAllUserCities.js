import City from "../../models/cities.js";

const getAllUserCities = async (req, res) => {
  const { _id } = req.user;

  const result = await City.aggregate([
    {
      $match: { assignees: _id },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignees",
        foreignField: "_id",
        as: "assignees",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        assignees: {
          $map: {
            input: "$assignees",
            as: "owner",
            in: {
              name: "$$owner.name",
              email: "$$owner.email",
            },
          },
        },
      },
    },
  ]);
  res.json(result);
};

export default getAllUserCities;
