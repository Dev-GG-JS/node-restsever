const express = require("express");
const app = express();
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/usuario", function (req, res) {
  res.json("get user");
});

app.post("/usuario", function (req, res) {
  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      message: "Se require un nombre",
    });
  } else {
    res.json({
      usuario: body,
    });
  }
});

app.put("/usuario/:id", function (req, res) {
  let id = parseInt(req.params.id);
  res.json({
    id,
  });
});

app.delete("/usuario", function (req, res) {
  res.json("delete user");
});

app.listen(3000, () => {
  console.log("Escuchando el puerto", 3000);
});
