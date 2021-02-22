module.exports = (err, _res, req, _next) => {
  const { status, message } = err;
  req.status(status).json({ message });
};
