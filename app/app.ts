import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import routes from "./routes";
require("dotenv").config()

const app: Application = express();

const options: CorsOptions = {
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

// middleware
app.use(helmet());
app.use(cors(options));
app.use(express.json());
app.set("port", process.env.PORT || 5000);

// use all endpoints
app.use(routes);

try {
  app.listen(app.get("port"), async () => {
    console.log("the server is running on port",
      app.get("port")
    );
  });
} catch (err) {
  console.log(err);
}