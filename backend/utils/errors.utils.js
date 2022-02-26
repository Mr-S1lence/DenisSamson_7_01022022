module.exports.signUpErrors = (err) => {
    let errors = { email: ''}
    console.log(err.sqlMessage);
    if(err.sqlMessage.includes('Duplicate entry'))
    errors.email = "Email déjà inscrit";
    return errors;
}