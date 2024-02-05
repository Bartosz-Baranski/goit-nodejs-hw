const getCurrent = (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export default getCurrent;
