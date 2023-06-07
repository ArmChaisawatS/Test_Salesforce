const db = require("../database/models");

exports.repoUserAll = async () => await db.Users.findAll();

exports.repoUserById = async (id) =>
  await db.Users.findAll({
    where: {
      id: id,
    },
  });


exports.repoUserByUsername = async (username) =>
  await db.Users.findAll({
    where: {
      username: username,
    },
  });


exports.repoAddUser = async (user) => await db.Users.create(user);

exports.repoUpdateUser = async (username, user) =>
  await db.Users.update(user, {
    where: {
        username: username,
    },
  });

exports.repoRemoveUser = async (id) =>
  await db.Users.destroy({
    where: {
      id: id,
    },
  });