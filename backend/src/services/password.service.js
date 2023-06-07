const passwordRepositories = require("../repositories/password.repositories");

exports.servPasswordByUsername = async (username) =>
  await passwordRepositories.repoPasswordByUsername(username);

exports.servAddPassword = async (username, passwordHash) => {
  await passwordRepositories.repoAddPassword({
    username: username,
    password: passwordHash,
  });
}
exports.servDeletePassword = async (passwordDelete) =>
  await passwordRepositories.repoRemovePassword(passwordDelete);

