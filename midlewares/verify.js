const emailValido = (email) => {
  const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexMail.test(String(email).toLowerCase());
};

function verifyName(name) {
  const err = { isErr: false };
  if (!name || name === '') {
    err.isErr = true;
    err.message = 'Invalid entries. Try again.';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyEmail(email) {
  const err = { isErr: false };

  if (!email || !emailValido(email)) {
    err.isErr = true;
    err.message = 'Invalid entries. Try again.';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }

  return err;
}

module.exports = { verifyName, verifyEmail };
