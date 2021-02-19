module.exports = (err, res, _req, _next) => {
  const { status, message } = err;
  res.status(status).json({ message });
};
