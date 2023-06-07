const userServices = require("../services/user.service");
const passwordServices = require("../services/password.service");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const multerConfig = require("../configs/multer");
const upload = multer(multerConfig.config).single(multerConfig.keyUpload);

let passwordHash;
let status = true;

exports.getUserAll = async (req, res) =>
  res.json(await userServices.servUserAll());

exports.getUserById = async (req, res) =>
  res.json(await userServices.servUserById(req.params.id));

exports.getUserByUsername = async (req, res) =>
  res.json(await userServices.servUserByUsername(req.body.username));

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await userServices.servUserByUsername(username);
  if (result != "") {
    const checkPassword = result[0]["password"];
    const isMatch = await bcrypt.compare(password, checkPassword);
    if (isMatch == true) {
      const token = await userServices.servLoginUser(username);
      if (!token) {
        res
          .status(200)
          .json({ msg: `ไม่พบแอดมิน username ${username} ในระบบ` });
        return;
      }
      res.json({ token });
    } else {
      res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: 0 });
    }
  } else {
    res.status(200).json({ msg: "ไม่พบผู้ใช้ในระบบ", Status: 1 });
  }
};

exports.addUser = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res
        .status(200)
        .json({ msg: `err :${error.message}`, Status: false });
    }
    const result = await userServices.servUserByUsername(req.body.username);
    if (result != "") {
      res.status(200).json({
        msg: "username ของท่านถูกใช้งานไปแล้ว กรุณาใช้ username อื่น",
        Status: false,
      });
    } else {
      const password = req.body.password;
      const passwordHash = await securePassword(password);
      await passwordServices.servAddPassword(req.body.username, passwordHash);
      const newData = await userServices.servAddUser(
        req.body,
        passwordHash,
        req.file
      );
      res
        .status(200)
        .json({ newData, msg: "เพิ่มข้อมูลเรียบร้อยแล้ว", Status: true });
    }
  });
};

exports.updateUser = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      return res
        .status(200)
        .json({ msg: `err :${error.message}`, Status: false });
    }
    const result = await userServices.servUserByUsername(req.sub);
    if (result) {
      const checkPassword = result[0]["password"];
      const username = req.sub;
      const password = req.body.password;
      const newPassword = req.body.newpassword;
      if (newPassword != undefined) {
        const status = await checkPasswordInDB(username, newPassword);
        if (status == false) {
          res.status(200).json({
            msg: "รหัสผ่านของท่านเคยถูกใช้งานไปแล้ว",
            Status: false,
          });
        } else {
          const isMatch = await bcrypt.compare(password, checkPassword);
          if (isMatch == true) {
            if (newPassword != "") {
              const salt = await securePassword(newPassword);
              passwordHash = salt;
            } else {
              passwordHash = checkPassword;
            }
            await passwordServices.servAddPassword(username, passwordHash);
            const dataUpdate = await userServices.servUpdateUser(
              req.body,
              passwordHash,
              req.sub,
              req.file
            );
            const countPassword = await passwordServices.servPasswordByUsername(
              username
            );
            if (countPassword.length > 5) {
              passwordDelete = countPassword[0]["password"];
              console.log(passwordDelete);
              await passwordServices.servDeletePassword(passwordDelete);
            }
            res.status(200).json({
              msg: "อัพเดทข้อมูลเรียบร้อยแล้ว",
              Status: true,
              dataUpdate,
            });
          } else {
            res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
          }
        }
      }
      else if (newPassword == undefined) {
          const isMatch = await bcrypt.compare(password, checkPassword);
          if (isMatch == true) {
            passwordHash = checkPassword;
            const dataUpdate = await userServices.servUpdateUser(
              req.body,
              passwordHash,
              req.sub,
              req.file
            );
            res.status(200).json({
              msg: "อัพเดทข้อมูลเรียบร้อยแล้ว",
              Status: true,
              dataUpdate,
            });
          } else {
            res.status(200).json({ msg: "รหัสผ่านไม่ถูกต้อง", Status: false });
          }
        
      }
      
    } else {
      res
        .status(200)
        .json({ msg: "อัพเดทข้อมูลไม่สำเร็จ", Status: false });
    }
  });
};

exports.deleteUser = async (req, res) => {
  const result = await userServices.servDeleteUser(req.params.id);
  if (result) {
    res
      .status(200)
      .json({ msg: "ลบผู้ใช้งานออกจากระบบเรียบร้อยแล้ว", Status: true });
  } else {
    res.status(200).json({ msg: "ไม่พบข้อมูลผู้ใช้ที่จะลบ", Status: false });
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const checkPasswordInDB = async (username, newPassword) => {
  let indexPassword = [];
  try {
    const ps = await passwordServices.servPasswordByUsername(username);
    for (let i = 0; i < ps.length; i++) {
      indexPassword[i] = ps[i]["password"];
      const Match = await bcrypt.compare(newPassword, indexPassword);
      if (Match == true) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
