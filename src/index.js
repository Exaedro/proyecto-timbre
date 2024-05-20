import express from "express";
import session from "express-session";

import { conectarDB } from "./utils/database.js";

import morgan from "morgan";
import path from "node:path";

const puerto = process.env.PORT || 3000;
const app = express();

// Vistas
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/vistas"));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Sesiones
app.use(
  session({
    secret: "123", // Cambiar secret mas tarde
    resave: true,
    saveUninitialized: true,
  }),
);

// Rutas
import { loginRutas } from "./rutas/login.routes.js";
import { indexRutas } from "./rutas/index.routes.js";
import { panelRutas } from "./rutas/panel.routes.js";

app.use(loginRutas);
app.use(indexRutas);
app.use(panelRutas)

// Estatico
app.use(express.static(path.join(process.cwd(), 'src/public')))
app.use('/panel', express.static(path.join(process.cwd(), 'src/public')))
app.use('/panel/horarios', express.static(path.join(process.cwd(), 'src/public')))

app.listen(puerto, () => {
  console.log("Servidor en marcha.");
});
