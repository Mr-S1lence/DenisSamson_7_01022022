module.exports.signUpErrors = (err) => {
  let errors = { email: "" };
  console.log(err.sqlMessage);
  if (err.sqlMessage.includes("Duplicate entry"))
    errors.email = "Email déjà inscrit";
  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };

  /*     if(err.message.includes('invalid file'))
      errors.format = "Format incompatible";

  if(err.message.includes('max size'))
      errors.maxSize = "Le fichier dépasse 500ko"; */

  return errors;
};
