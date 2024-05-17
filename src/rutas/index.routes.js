import { Router } from "express";
export const indexRutas = new Router();

import { esAdmin, esGestionador } from "../middlewares/auth.js";

indexRutas.get("/", (req, res) => {
	res.send("Hola Mundo");
});

indexRutas.get("/panel", [esAdmin, esGestionador], (req, res) => {
	const { nombreUsuario, rol } = req.session;

	res.render("administrador/panel", { nombreUsuario, rol });
});
