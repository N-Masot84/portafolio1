import express from "express";
import morgan from "morgan";
import path from "path";
import routes from "./routes/index.js";
import config from "./config.js";
import {fileURLToPath} from "url";

const app = express();
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings
app.set("port", config.PORT);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Lectura de datos desde formularios


// global variables
app.use((req, res, next) => {
  console.log(config.APPID)
  app.locals.APPID = config.APPID;
  next();
});


// Routes
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404");
});


app.listen(app.get("port"));

console.log("Server on port", app.get("port"));

export default app;

