import "dotenv/config";
const express = require("express");
const mongoose = require("mongoose");
const routes = require("../routes");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.Server(app);

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../../swagger_output.json");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(express.json());

app.use(routes);

let port: number | string | undefined = process.env.PORT;
if (!port) {
  port = 3333;
}

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

server.listen(port, function () {
  console.log(`Server started Successfully on port ${port}`);
});
