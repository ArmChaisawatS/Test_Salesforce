const db = require("../database/models");

exports.repoPasswordByUsername = async (username) =>
  await db.Passwords.findAll({
    where: {
      username: username,
    },
  });

exports.repoAddPassword = async (username, password) => await db.Passwords.create(username, password);

exports.repoRemovePassword = async (passwordDelete) =>
  await db.Passwords.destroy({
    where: {
      password: passwordDelete,
    },
  });

