const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");
const app = express();

app.get("/usuario", function (req, res) {
  let desde = Number(req.query.desde) || 0;

  let limite = Number(req.query.limite) || 5;
  Usuario.find({estado:true}, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((error, usuarios) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          message: error,
        });
      }

      Usuario.countDocuments({estado:true}, (err, conteo) => {
        res.json({
          ok: true,
          cuantos: conteo,
          usuarios,
        });
      });
    });

  // res.json("get user development");
});

app.post("/usuario", function (req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    google: body.google,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put("/usuario/:id", function (req, res) {
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
  let id = req.params.id;

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/:id", function (req, res) {
  let id = req.params.id;
  let cambiaEstado = {
    estado: false,
  };
  Usuario.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, usuarioDesactivado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: 'Usuario no encontrado',
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDesactivado,
      });
    }
  );
});

module.exports = app;
