const userRepositories = require("../repositories/user.repositories");
const jwt = require("../middleware/jwt");


exports.servUserAll = async () => await userRepositories.repoUserAll();

exports.servUserById = async (id) => await userRepositories.repoUserById(id);

exports.servUserByUsername = async (username) =>
  await userRepositories.repoUserByUsername(username);

exports.servLoginUser = async (username) => {
  const result = await userRepositories.repoUserByUsername(username);
  if (result != "") {
    const username = result[0]["username"];
    const payload = {
      sub: username,
      status: 1,
    };
    return jwt.generateToken(payload);
  } else {
    return { message: "กรุณากรอกยูสเซอร์ให้ถูกต้อง", Status: 1 };
  }
};


exports.servAddUser = async (user, passwordHash, file) => {
  await userRepositories.repoAddUser({
    ...user,
    password: passwordHash,
    image: file ? file.filename : ""
  });
}
exports.servUpdateUser = async (user, passwordHash, username, file) => {
  const updated = await userRepositories.repoUpdateUser(username, {
    ...user,
    password: passwordHash,
    image: file ? file.filename : file
  });
  if (updated) {
    return await userRepositories.repoUserByUsername(username);
  }
  return null;
};

exports.servDeleteUser = async (id) =>
  await userRepositories.repoRemoveUser(id);
