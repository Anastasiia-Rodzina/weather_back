const currentUser = (req, res, next) => {
  const { _id, name, email } = req.user;
  res.json({ _id, name, email });
};

export default currentUser;
