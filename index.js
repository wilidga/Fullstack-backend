const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const commentController = require("./controllers/commentController");
require("dotenv").config();

const port = process.env.PORT;

const { dbConnection } = require("./DB/config");

const app = express();

dbConnection();

app.use(cors());

//directorio publico
//app.use(express.static("public"));
app.use(express.static("uploads"));


app.use(express.json());

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));
app.use("/api/users/auth", require("./routes/login"));
app.use("/api/posts", require("./routes/commentNew"));

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});
