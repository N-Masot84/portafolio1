import express from "express";
import cookieParser from 'cookie-parser';
import morgan from "morgan";

import router from './routes/router.js';
import config from "./config.js";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Settings
app.set("port", config.PORT);
app.set("views", path.resolve(__dirname, "views"));

//Seteo carpeta public para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Motor de plantillas
app.set("view engine", "ejs")

// Middlewares
app.use(morgan("dev"));

//Lectura de datos desde formularios
app.use(express.urlencoded({ extended: true }));

//Para trabajar con cookies
app.use(cookieParser());

app.use(express.json());

// Global variables
app.use((req, res, next) => {
  console.log(config.APPID)
  app.locals.APPID = config.APPID;
  next();
});

//Seteo de rutas
app.use('/', router);

//Seteo variables de entorno
dotenv.config({path: './env/.env'});


// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404");
});

//Para eliminar el cache y no volver con el boton de back luego de hacer un LOGOUT
// app.use(function(req, res, next) {
//   if (!req.user) {
//       res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//   } 
//   next();
// });

app.listen(app.get("port"));

console.log("Server on port", app.get("port"));

export default app;

