const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { genJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { user, password, password_repeat } = req.body;

  try {
    if (password !== password_repeat) {
      return res.status(400).json({
        ok: false,
        msg: "Las contraseñas no coinciden",
      });
    }

    let userResponse = await User.findOne({ user });

    if (userResponse) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese nombre",
      });
    }

    const userModel = User(req.body);

    console.log(userModel);

    // !Password -> Encriptar  (bcryptjs)

    const salt = bcrypt.genSaltSync();
    userModel.password = bcrypt.hashSync(password, salt);

    console.log(userModel);

    await userModel.save();

    // !Generar JWT

    res.status(201).json({
      ok: true,
      uid: userModel.id,
      //token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador!",
    });
  }
};

const EnterUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El email o la contraseña son incorrectos",
      });
    }

    // !Confirmar los passwords

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El email o la contraseña son incorrectos",
      });
    }

    // ! Generar nuestro JWT

    const token = await genJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se ha podido iniciar sesión!",
    });
  }
};

const reNewToken = async (req, res) => {
  const { id, name } = req;

  // !generar un nuevo JWT y retornarlo en esta petición.

  const token = await genJWT(id, name);

  res.json({
    ok: true,
    token,
  });
};

const hola = async (req, res) => {
  console.log(req);

  res.status(200).json({
    ok: true,
    msg: "PRUEBA!!!",
  });
};

module.exports = {
  createUser,
  EnterUser,
  reNewToken,
  hola,
};
